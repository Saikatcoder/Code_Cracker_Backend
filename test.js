function getJudge0LanguageId(language) {
    const languageMap = {
      PYTHON: 71,
      JAVASCRIPT: 63,
      JAVA: 62,
      CPP: 54,
      GO: 60,
    };
    return languageMap[language.toUpperCase()];
  }
  
  const sampleStringProblem = {
    referenceSolutions: {
      JAVASCRIPT: `/**
       * @param {string} s
       * @return {boolean}
       */
      function isPalindrome(s) {
        // Convert to lowercase and remove non-alphanumeric characters
        s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Check if it's a palindrome
        let left = 0;
        let right = s.length - 1;
        
        while (left < right) {
          if (s[left] !== s[right]) {
            return false;
          }
          left++;
          right--;
        }
        
        return true;
      }
      
      // Add readline for dynamic input handling
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });
      
      // Process input line
      rl.on('line', (line) => {
        // Call solution with the input string
        const result = isPalindrome(line);
        
        // Output the result
        console.log(result ? "true" : "false");
        rl.close();
      });`,
      PYTHON: `class Solution:
          def isPalindrome(self, s: str) -> bool:
              # Convert to lowercase and keep only alphanumeric characters
              filtered_chars = [c.lower() for c in s if c.isalnum()]
              
              # Check if it's a palindrome
              return filtered_chars == filtered_chars[::-1]
      
      # Input parsing
      if __name__ == "__main__":
          import sys
          # Read the input string
          s = sys.stdin.readline().strip()
          
          # Call solution
          sol = Solution()
          result = sol.isPalindrome(s)
          
          # Output result
          print(str(result).lower())  # Convert True/False to lowercase true/false`,
      JAVA: `import java.util.Scanner;
    
    public class Main {
        public static String preprocess(String s) {
            return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        }
    
        public static boolean isPalindrome(String s) {
            s = preprocess(s);
            int left = 0, right = s.length() - 1;
    
            while (left < right) {
                if (s.charAt(left) != s.charAt(right)) return false;
                left++;
                right--;
            }
    
            return true;
        }
    
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            String input = sc.nextLine();
    
            boolean result = isPalindrome(input);
            System.out.println(result ? "true" : "false");
        }
    }
    `,
    },
    testCases: [
      {
        input: "A man, a plan, a canal: Panama",
        output: "true",
      },
      {
        input: "race a car",
        output: "false",
      },
      {
        input: " ",
        output: "true",
      },
    ],
  };
  
  const { referenceSolutions, testCases } = sampleStringProblem;
  
  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
   
    console.log(`Language: ${language}`);
    console.log(`Solution Code:\n${solutionCode}`);
  
    console.log("Test Cases:");
    testCases.forEach(({ input, output }, index) => {
      console.log(`Test Case ${index + 1}:`);
      console.log(`Input: ${input}`);
      console.log(`Expected Output: ${output}`);
    });
  
    console.log("-----------------------------------");
  }




  const data = `{
    "title": "Add Two Numbers",
    "description": "Given two numbers a and b add them up and return the outout",
    "difficulty": "EASY",
    "tags": [
        "math",
        "operators",
        "addition"
    ],
    "examples": {
        "PYTHON": {
            "input": "3 7",
            "output": "10",
            "explanation": "Adding 3 and 7 gives 10."
        },
        "JAVASCRIPT": {
            "input": "-5 12",
            "output": "7",
            "explanation": "Adding -5 and 12 gives 7."
        }
    },
    "constraints": "-10^9 ≤ a, b ≤ 10^9",
    "testcases": [
        {
            "input": "100 200",
            "output": "300"
        },
        {
            "input": "-500 -600",
            "output": "-1100"
        },
        {
            "input": "0 0",
            "output": "0"
        }
    ],
    "codeSnippets": {
        "JAVASCRIPT": "const readline = require('readline');\n\nfunction addTwoNumbers(a, b) {\n    // Write your code here\n    // Return the sum of a and b\n}\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet inputLines = [];\n\nrl.on('line', (line) => {\n    inputLines = line.split(' ');\n    rl.close();\n}).on('close', () => {\n    const a = parseInt(inputLines[0], 10);\n    const b = parseInt(inputLines[1], 10);\n    console.log(addTwoNumbers(a, b));\n});",
        "PYTHON": "def add_two_numbers(a, b):\n    # Write your code here\n    # Return the sum of a and b\n    pass\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(add_two_numbers(a, b))",
        "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumbers(int a, int b) {\n        // Write your code here\n        // Return the sum of a and b\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(addTwoNumbers(a, b));\n    }\n}"
    },
    "referenceSolutions": {
        "JAVASCRIPT": "const readline = require('readline');\n\nconst rl = readline.createInterface({\n    input: process.stdin,\n    output: process.stdout\n});\n\nlet inputLines = [];\n\nrl.on('line', (line) => {\n    inputLines = line.split(' ');\n    rl.close();\n}).on('close', () => {\n    const a = parseInt(inputLines[0], 10);\n    const b = parseInt(inputLines[1], 10);\n    console.log(a + b);\n});",
        "PYTHON": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(a + b)",
        "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
    }
}
`
// "12 13"
// const input = fs.readFileSync(0, 'utf-8').trim();
// const [a, b] = input.split(' ').map(Number);

`const fs = require('fs');\n\nfunction addTwoNumbers(a, b) {\n    // Write your code here\n    // Return the sum of a and b\n    return a + b;\n}\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(addTwoNumbers(a, b))`


