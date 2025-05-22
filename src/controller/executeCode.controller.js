import { json } from "express"
import { getLanguageName, pollBatchResults, submitBatch } from "../libs/jdge0.libs.js"
import {db} from '../libs/db.js'
export const executeCode = async (req,res)=>{
    try {
        const {source_code, language_id, stdin, expected_outputs, problemId} = req.body

        const userId = req.user.id

        // validate test case 
        if(!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length){
            return res.status(400).json({
                error:"invalid of missing test case"
            })
        }
        // prepare each test case for judge0 batch submision
        const submissions = stdin.map((input)=>({
            source_code,
            language_id,
            stdin:input,
        }))
        
        //3. send this batch of submission to judge0
        const submitResponse = await submitBatch(submissions)
        const tokens = submitResponse.map((res)=>res.token)

        // pool judgeo for results of all submitted test cases
        const results = await pollBatchResults(tokens)
        
        let allPassed = true
        const detailedReslts = results.map((result,i)=>{
            const stdout = result.stdout?.trim();
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output

            if(!passed) allPassed = false;
            return {
                testCases: i+1,
                passed,
                stdout,
                expected:expected_output,
                stderr:result.stderr || null,
                compile_output:result.compile_output || null,
                status:result.status.description,
                memory:result.memory ? `${result.memory}KB`:undefined,
                time:result.time ? `${result.time}s`:undefined
            }

            // console.log(`Testcase #${i+1}`);
            // console.log(`Input for testcase #${i+1}: ${stdin[i]}`);
            // console.log(`Expected output for the testCasse ${expected_output}`);
            // console.log(`Actual output${stdout}`);
            
            // console.log(`Matched : ${passed}`);
            
        })

        const submission = await bd.submission.create({
            data:{
                userId,
                problemId,
                sourceCode:source_code,
                language:getLanguageName(language_id),
                stdin:stdin.join("\n"),
                stdout:JSON.stringify(detailedReslts.map((r)=>r.stdout)),
                stderr:detailedReslts.some((r)=> r.stderr) ? JSON.stringify(detailedReslts.map((r)=> r.stderr)) :  null,
                compileOutput:detailedReslts.some((r)=> r.compile_output) 
                ? JSON.stringify(detailedReslts.map((r)=> r.compile_output)) :  null,
                status:allPassed ? "Accepted" : "Wrong Answer",
                memory : detailedReslts.some((r)=> r.memory) ? JSON.stringify(detailedReslts.map((r)=> r.memory)) :  null,
                time : detailedReslts.some((r)=> r.time) ? JSON.stringify(detailedReslts.map((r)=> r.time)) :  null,
            },
        })
        // if all passed = true mark problem as solved for the current user
        if(allPassed){
            await db.problemSolved.upsert({
                where:{
                userId_problemId:{
                    userId , problemId
                }
            },
            update:{},
            create:{
                userId,problemId
            }
            })
            
        }

        // 8.save individual test case result
        const testCaseResults = detailedReslts.map((result)=>({
            submissionId: submission.id,
            testCases:result.testCases,
            passed:result.passed,
            stdout:result.stdout,
            expected:result.expected,
            stderr:result.stderr,
            compileOutput:result.compile_output,
            status : result.status,
            memory:result.memory,
            time:result.time,
        }))
        await db.testCaseResult.createMany({
            data:testCaseResults
        })

        const submisionWithTestCase = await db.submission.findUnique({
            where:{
                id:submission.id
            },
            include:{
                testCases:true
            }
        })
    
        res.status(200).json({
            success:true,
            message:"code Excuted successfully",
            submission:submisionWithTestCase
        })
    } catch (error) {
        console.error("Error excuting code", error.message);
        res.status(500).json({error:"Failed to excuted code"})
    }
}