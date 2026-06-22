# React / Frontend Coding Interview Questions

## The Ultimate Guide for React Developers • Frontend Engineers • UI Engineers • JavaScript Engineers

---

> **100+ Coding Problems** with solutions in JavaScript/TypeScript, explanations, time/space complexity analysis, and frontend/React relevance. These are the exact types of problems asked in technical interviews for React and frontend engineering roles.

---

# Section 1: String Problems

---

### 1. Longest Substring Without Repeating Characters

**Difficulty:** Medium

**Problem:** Given a string, find the length of the longest substring without repeating characters.

**Example:**
```
Input: "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length 3.

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with length 1.

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with length 3.
```

**Solution:**

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    if (charMap.has(char)) {
      // Move start to after the previous occurrence
      start = Math.max(start, charMap.get(char) + 1);
    }

    charMap.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Tests
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3
```

**Time Complexity:** O(n) — Single pass through the string
**Space Complexity:** O(min(m, n)) — Where m is the character set size

**Frontend Relevance:** Tests your ability to use the sliding window pattern, which is valuable for form input validation, parsing user-typed content in real-time search, and handling dynamic text patterns in rich text editors.

---

### 2. Valid Palindrome

**Difficulty:** Easy

**Problem:** Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring case sensitivity.

**Example:**
```
Input: "A man, a plan, a canal: Panama"
Output: true

Input: "race a car"
Output: false

Input: " "
Output: true
```

**Solution:**

```javascript
function isPalindrome(s) {
  // Clean the string: remove non-alphanumeric, lowercase
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Two-pointer approach
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// Alternative: Compare with reversed string
function isPalindromeSimple(s) {
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return cleaned === cleaned.split("").reverse().join("");
}

// Tests
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
console.log(isPalindrome(" ")); // true
```

**Time Complexity:** O(n)
**Space Complexity:** O(n) for cleaned string

**Frontend Relevance:** Palindromes test your string manipulation skills — crucial for parsing and validating user input (search bars, form fields), implementing undo/redo stacks, and handling text transformations in UI components.

---

### 3. Longest Palindromic Substring

**Difficulty:** Medium

**Problem:** Given a string, find the longest palindromic substring.

**Example:**
```
Input: "babad"
Output: "bab" or "aba"

Input: "cbbd"
Output: "bb"
```

**Solution:**

```javascript
function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLength = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        start = left;
        maxLength = currentLength;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);       // Odd length palindrome
    expandAroundCenter(i, i + 1);   // Even length palindrome
  }

  return s.substring(start, start + maxLength);
}

// Tests
console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd"));  // "bb"
console.log(longestPalindrome("a"));     // "a"
```

**Time Complexity:** O(n²)
**Space Complexity:** O(1)

**Frontend Relevance:** Expands on basic palindrome concept. Tests your ability to optimize and think about edge cases — essential for writing robust React components that handle all possible input states and edge cases in user interactions.

---

### 4. Valid Anagram

**Difficulty:** Easy

**Problem:** Given two strings, determine if they are anagrams (contain the same characters in the same frequency).

**Example:**
```
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false
```

**Solution:**

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const charCount = {};

  // Count characters in first string
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement for second string
  for (const char of t) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }

  return true;
}

// Alternative: Sort and compare
function isAnagramSort(s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
}

// Tests
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));        // false
```

**Time Complexity:** O(n)
**Space Complexity:** O(1) — Fixed character set

**Frontend Relevance:** Tests hash map / frequency counting skills. Useful for comparing data sets in React state, verifying filtered/search results match expected data, and analyzing user input patterns.

---

### 5. First Unique Character in a String

**Difficulty:** Easy

**Problem:** Find the first non-repeating character in a string and return its index. If it doesn't exist, return -1.

**Example:**
```
Input: "leetcode"
Output: 0 (character 'l')

Input: "loveleetcode"
Output: 2 (character 'v')

Input: "aabb"
Output: -1
```

**Solution:**

```javascript
function firstUniqChar(s) {
  const charCount = {};

  // Count occurrences
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Find first unique
  for (let i = 0; i < s.length; i++) {
    if (charCount[s[i]] === 1) {
      return i;
    }
  }

  return -1;
}

// Tests
console.log(firstUniqChar("leetcode"));    // 0
console.log(firstUniqChar("loveleetcode")); // 2
console.log(firstUniqChar("aabb"));        // -1
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Frontend Relevance:** Tests character frequency analysis. Useful for validating that rendered lists have unique keys, detecting duplicate data in tables, and real-time duplicate detection in form inputs (e.g., detecting if a username/email is already taken).

---

# Section 2: Array Problems

---

### 1. Two Sum

**Difficulty:** Easy

**Problem:** Given an array of integers and a target, return indices of the two numbers that add up to the target.

**Example:**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

**Solution:**

```javascript
function twoSum(nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(nums[i], i);
  }

  return [];
}

// Tests
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));          // [0, 1]
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Frontend Relevance:** **Most commonly asked coding problem in frontend interviews.** Tests hash map optimization. The pattern of "find complement" applies to matching UI elements, tab management, and optimizing React re-renders by finding matching state dependencies.

---

### 2. Remove Duplicates from Sorted Array

**Difficulty:** Easy

**Problem:** Remove duplicates in-place from a sorted array and return the new length.

**Example:**
```
Input: nums = [1, 1, 2]
Output: 2, nums = [1, 2, _]

Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5, nums = [0, 1, 2, 3, 4, _, _, _, _, _]
```

**Solution:**

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let uniqueIndex = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[i];
    }
  }

  return uniqueIndex + 1;
}

// Tests
const nums1 = [1, 1, 2];
console.log(removeDuplicates(nums1)); // 2
console.log(nums1.slice(0, 2));       // [1, 2]

const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums2)); // 5
console.log(nums2.slice(0, 5));       // [0, 1, 2, 3, 4]
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Frontend Relevance:** Tests in-place array manipulation and two-pointer technique. Useful for deduplicating API response data, cleaning up user-submitted lists, and optimizing data before rendering it in React components.

---

### 3. Contains Duplicate

**Difficulty:** Easy

**Problem:** Given an array, return true if any value appears at least twice.

**Example:**
```
Input: [1, 2, 3, 1]
Output: true

Input: [1, 2, 3, 4]
Output: false
```

**Solution:**

```javascript
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}

// Alternative: Compare set size
function containsDuplicateSet(nums) {
  return new Set(nums).size !== nums.length;
}

// Tests
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Frontend Relevance:** Tests set/hash map usage. Directly applicable to checking for duplicate React keys, ensuring unique list items in sorted/filtered views, and validating unique constraints in form submissions.

---

### 4. Maximum Subarray (Kadane's Algorithm)

**Difficulty:** Medium

**Problem:** Find the contiguous subarray with the largest sum.

**Example:**
```
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: [4, -1, 2, 1] has sum 6.
```

**Solution:**

```javascript
function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the subarray or start a new one
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// Tests
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([1]));    // 1
console.log(maxSubArray([5, 4, -1, 7, 8])); // 23
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Frontend Relevance:** Tests dynamic programming fundamentals. The "maximum so far" pattern is useful for analytics dashboards, tracking user progress/scores, and optimizing state updates by tracking best-performing data points.

---

### 5. Product of Array Except Self

**Difficulty:** Medium

**Problem:** Return an array where each element is the product of all other elements in the original array (without using division).

**Example:**
```
Input: [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

**Solution:**

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left products
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

// Tests
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
```

**Time Complexity:** O(n)
**Space Complexity:** O(1) (excluding output)

**Frontend Relevance:** Tests prefix/suffix pattern crucial for optimization problems. Useful for calculating accumulated values in tables, computing running totals in financial dashboards, and pre-computing derived data for React performance.

---

### 6. Find All Duplicates in an Array

**Difficulty:** Medium

**Problem:** Given an array of integers (1 ≤ a[i] ≤ n), find all elements that appear twice.

**Example:**
```
Input: [4, 3, 2, 7, 8, 2, 3, 1]
Output: [2, 3]
```

**Solution:**

```javascript
function findDuplicates(nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;

    if (nums[index] < 0) {
      result.push(Math.abs(nums[i]));
    } else {
      nums[index] = -nums[index];
    }
  }

  return result;
}

// Tests
console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2, 3]
console.log(findDuplicates([1, 1, 2])); // [1]
```

**Time Complexity:** O(n)
**Space Complexity:** O(1) (excluding output)

**Frontend Relevance:** Tests in-place marking technique and array manipulation. Useful for detecting duplicate DOM keys, finding conflicting CSS class names, and memory-efficient data analysis in large datasets.

---

### 7. Move Zeroes

**Difficulty:** Easy

**Problem:** Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.

**Example:**
```
Input: [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

**Solution:**

```javascript
function moveZeroes(nums) {
  let nonZeroIndex = 0;

  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
      nonZeroIndex++;
    }
  }

  return nums;
}

// Tests
console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0])); // [0]
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Frontend Relevance:** Tests two-pointer technique and in-place manipulation. Useful for sorting/filtering lists in React state, reordering table columns, and implementing drag-and-drop reordering logic.

---

### 8. Find the Missing Number

**Difficulty:** Easy

**Problem:** Given an array containing n distinct numbers taken from 0 to n, find the one that is missing.

**Example:**
```
Input: [3, 0, 1]
Output: 2

Input: [0, 1]
Output: 2

Input: [9, 6, 4, 2, 3, 5, 7, 0, 1]
Output: 8
```

**Solution:**

```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Alternative: XOR approach (no overflow risk)
function missingNumberXOR(nums) {
  let xor = nums.length;

  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }

  return xor;
}

// Tests
console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1]));    // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Frontend Relevance:** Tests mathematical pattern recognition and XOR bit manipulation. Useful for validating sequential data like pagination indexes, step indicators in multi-step forms, and detecting gaps in loaded data sets.

---

# Section 3: Linked List & Tree Problems

---

### 1. Reverse a Linked List

**Difficulty:** Easy

**Problem:** Reverse a singly linked list.

**Example:**
```
Input: 1 → 2 → 3 → 4 → 5 → null
Output: 5 → 4 → 3 → 2 → 1 → null
```

**Solution:**

```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next; // Save next
    current.next = prev;           // Reverse pointer
    prev = current;                // Move prev forward
    current = nextNode;            // Move current forward
  }

  return prev;
}

// Recursive solution
function reverseListRecursive(head) {
  if (head === null || head.next === null) return head;

  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}

// Tests
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
let reversed = reverseList(list);
// 5 → 4 → 3 → 2 → 1 → null
```

**Time Complexity:** O(n)
**Space Complexity:** O(1) iterative, O(n) recursive

**Frontend Relevance:** Tests pointer manipulation and recursion. While linked lists aren't commonly used directly in React, the pattern of traversing and transforming data structures is directly applicable to working with immutable state updates, linked UI navigation flows, and undo/redo chains.

---

### 2. Maximum Depth of Binary Tree

**Difficulty:** Easy

**Problem:** Find the maximum depth (height) of a binary tree.

**Example:**
```
Input: [3, 9, 20, null, null, 15, 7]
    3
   / \
  9  20
    /  \
   15   7
Output: 3
```

**Solution:**

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

// Iterative (BFS)
function maxDepthBFS(root) {
  if (root === null) return 0;

  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    depth++;
  }

  return depth;
}

// Tests
const tree = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(maxDepth(tree)); // 3
console.log(maxDepthBFS(tree)); // 3
```

**Time Complexity:** O(n)
**Space Complexity:** O(h) where h is tree height (recursive), O(w) where w is max width (BFS)

**Frontend Relevance:** Tests recursion/DFS and BFS patterns. Tree traversal fundamentals directly apply to React's component tree — understanding the component hierarchy, rendering nested comment threads, implementing recursive tree menus, and navigating file explorers.

---

### 3. Invert Binary Tree

**Difficulty:** Easy

**Problem:** Invert (mirror) a binary tree.

**Example:**
```
Input:           Output:
    4              4
  /   \          /   \
 2     7        7     2
/ \   / \      / \   / \
1 3  6  9     9 6  3  1
```

**Solution:**

```javascript
function invertTree(root) {
  if (root === null) return null;

  // Swap children
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// Tests
const tree2 = new TreeNode(4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7, new TreeNode(6), new TreeNode(9))
);
console.log(invertTree(tree2));
// Mirrored tree
```

**Time Complexity:** O(n)
**Space Complexity:** O(h)

**Frontend Relevance:** Tests recursion and tree manipulation. The "swap and recurse" pattern is useful for toggling UI layouts (LTR ↔ RTL), mirroring component trees for different locales, and understanding how transformations propagate through a component hierarchy.

---

# Section 4: Stack & Queue Problems

---

### 1. Valid Parentheses

**Difficulty:** Easy

**Problem:** Given a string containing '(', ')', '{', '}', '[', ']', determine if the string has valid parentheses.

**Example:**
```
Input: "()"
Output: true

Input: "()[]{}"
Output: true

Input: "(]"
Output: false

Input: "([)]"
Output: false

Input: "{[]}"
Output: true
```

**Solution:**

```javascript
function isValid(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of s) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// Tests
console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false
console.log(isValid("{[]}"));     // true
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Frontend Relevance:** **Extremely common in frontend interviews.** Tests stack data structure. The pattern of "opening/closing pairs" maps directly to HTML/JSX tag validation, checking for unclosed elements in rendered output, and implementing code editors with bracket matching.

---

### 2. Min Stack

**Difficulty:** Medium

**Problem:** Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

**Example:**
```
Input:
  push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()
Output:
  -3, 0, -2
```

**Solution:**

```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    return val;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// Tests
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top());    // 0
console.log(minStack.getMin()); // -2
```

**Time Complexity:** O(1) for all operations
**Space Complexity:** O(n)

**Frontend Relevance:** Tests auxiliary data structure design. The "track minimum alongside main data" pattern is useful for monitoring React state values, tracking min/max values in analytics dashboards, and managing undo/redo history with memory-efficient state snapshots.

---

### 3. Implement Queue using Stacks

**Difficulty:** Easy

**Problem:** Implement a queue using two stacks.

**Example:**
```
Input:
  push(1), push(2), peek(), pop(), empty()
Output:
  1, 1, false
```

**Solution:**

```javascript
class MyQueue {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }

  push(x) {
    this.inputStack.push(x);
  }

  pop() {
    this._transfer();
    return this.outputStack.pop();
  }

  peek() {
    this._transfer();
    return this.outputStack[this.outputStack.length - 1];
  }

  empty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }

  _transfer() {
    if (this.outputStack.length === 0) {
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }
  }
}

// Tests
const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek()); // 1
console.log(queue.pop());  // 1
console.log(queue.empty()); // false
```

**Time Complexity:** O(1) amortized for push/pop
**Space Complexity:** O(n)

**Frontend Relevance:** Tests understanding of data structure differences (FIFO vs LIFO). Useful for managing React event queues, processing UI notifications in order, handling sequential API requests, and implementing message queues for real-time features.

---

# Section 5: JavaScript Core Problems

---

### 1. Implement Debounce

**Difficulty:** Medium

**Problem:** Create a debounce function that delays invoking a function until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.

**Example:**
```
Input: debouncedSearch = debounce(searchAPI, 300)
       debouncedSearch("a")
       debouncedSearch("ab")   // Cancels previous
       debouncedSearch("abc")  // Cancels previous
       // After 300ms of no calls → searchAPI("abc") fires
```

**Solution:**

```javascript
function debounce(fn, delay, options = {}) {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis = null;

  const { leading = false, trailing = true } = options;

  function invoke() {
    fn.apply(lastThis, lastArgs);
    lastArgs = null;
    lastThis = null;
  }

  const debounced = function(...args) {
    lastArgs = args;
    lastThis = this;

    if (leading && !timeoutId) {
      invoke();
    }

    clearTimeout(timeoutId);

    if (trailing) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (!leading) invoke();
      }, delay);
    }
  };

  debounced.cancel = function() {
    clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = null;
    lastThis = null;
  };

  debounced.flush = function() {
    clearTimeout(timeoutId);
    if (lastArgs) invoke();
    timeoutId = null;
  };

  return debounced;
}

// Tests
let callCount = 0;
const debouncedFn = debounce(() => { callCount++; }, 100);

debouncedFn();
debouncedFn();
debouncedFn();

setTimeout(() => {
  console.log(callCount); // 1 (only last call fires after 100ms)
}, 200);

// Leading option test
let leadingCount = 0;
const leadingDebounced = debounce(() => { leadingCount++; }, 100, { leading: true, trailing: false });

leadingDebounced();
leadingDebounced();
console.log(leadingCount); // 1 (first call fires immediately)
```

**Time Complexity:** O(1) per call
**Space Complexity:** O(1)

**Frontend Relevance:** **Must-know for frontend interviews.** Debounce is essential for search inputs, auto-save, window resize handlers, and any scenario where you want to limit rapid function calls. Directly used in production React components every day. Be prepared to discuss leading vs trailing edge behavior.

---

### 2. Implement Throttle

**Difficulty:** Medium

**Problem:** Create a throttle function that ensures a function is called at most once every `limit` milliseconds.

**Example:**
```
Input: throttledScroll = throttle(handleScroll, 200)
       // handleScroll fires immediately, then at most once every 200ms
```

**Solution:**

```javascript
function throttle(fn, limit, options = {}) {
  let inThrottle = false;
  let lastArgs = null;
  let lastThis = null;
  let timeoutId = null;

  const { leading = true, trailing = true } = options;

  function invoke() {
    fn.apply(lastThis, lastArgs);
    lastArgs = null;
    lastThis = null;
    inThrottle = true;

    setTimeout(() => {
      inThrottle = false;
      if (trailing && lastArgs) {
        invoke();
      }
    }, limit);
  }

  const throttled = function(...args) {
    lastArgs = args;
    lastThis = this;

    if (!inThrottle) {
      if (leading) {
        invoke();
      } else {
        inThrottle = true;
        timeoutId = setTimeout(() => {
          inThrottle = false;
          if (trailing && lastArgs) {
            invoke();
          }
        }, limit);
      }
    }
  };

  throttled.cancel = function() {
    clearTimeout(timeoutId);
    inThrottle = false;
    lastArgs = null;
    lastThis = null;
  };

  return throttled;
}

// Tests
let callCount = 0;
const throttledFn = throttle(() => { callCount++; }, 200);

throttledFn(); // fires immediately
throttledFn(); // ignored
throttledFn(); // ignored

setTimeout(() => {
  console.log(callCount); // 1 (or 2 if trailing edge fires)
}, 300);

// Scroll handler pattern
function handleScroll() {
  console.log("Scroll position:", window.scrollY);
}
const throttledScroll = throttle(handleScroll, 100);
// window.addEventListener("scroll", throttledScroll);
```

**Time Complexity:** O(1) per call
**Space Complexity:** O(1)

**Frontend Relevance:** **Must-know for frontend interviews.** Throttle is essential for scroll handlers, resize events, drag-and-drop, and any scenario where you want consistent call rate limiting. Key difference from debounce: throttle guarantees execution at regular intervals, while debounce waits for a pause.

---

### 3. Implement Promise.all

**Difficulty:** Medium

**Problem:** Implement a function that resolves when all promises in an iterable resolve, or rejects with the reason of the first rejected promise.

**Example:**
```
Input: Promise.all([p1, p2, p3])
Output: [value1, value2, value3]
       or rejects with the first error
```

**Solution:**

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    const results = [];
    let completed = 0;
    const iterable = Array.from(promises);

    if (iterable.length === 0) {
      return resolve([]);
    }

    for (let i = 0; i < iterable.length; i++) {
      // Wrap non-Promise values in Promise.resolve
      Promise.resolve(iterable[i])
        .then(value => {
          results[i] = value;
          completed++;

          if (completed === iterable.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}

// Tests
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

promiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]

promiseAll([]).then(console.log); // []

// Rejection test
const failingPromise = Promise.reject("Error!");
promiseAll([p1, failingPromise, p2])
  .catch(err => console.log(err)); // "Error!"

// Non-promise values
promiseAll([1, "hello", true]).then(console.log); // [1, "hello", true]
```

**Time Complexity:** O(n) — All promises run in parallel
**Space Complexity:** O(n)

**Frontend Relevance:** **Extremely common in frontend interviews.** Promise.all is used daily for parallel API requests, loading multiple data sources on page load, waiting for multiple async validations, and coordinating async tasks in React components. Also be prepared to discuss Promise.allSettled, Promise.race, and Promise.any.

---

### 4. Implement Promise.race

**Difficulty:** Medium

**Problem:** Implement a function that resolves or rejects as soon as one of the promises in the iterable resolves or rejects.

**Solution:**

```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument is not iterable"));
    }

    for (const item of promises) {
      Promise.resolve(item)
        .then(resolve)
        .catch(reject);
    }
  });
}

// Tests
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 200));
const fast = new Promise(resolve => setTimeout(() => resolve("fast"), 100));

promiseRace([slow, fast]).then(console.log); // "fast"

// Timeout pattern
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timed out")), ms)
  );
  return promiseRace([promise, timeout]);
}
```

**Time Complexity:** O(1) — First settled promise wins
**Space Complexity:** O(1)

**Frontend Relevance:** Usefully for implementing request timeouts, racing multiple data sources (CDN fallback), and loading states where you want to show the fastest response first.

---

### 5. Implement Promise.allSettled

**Difficulty:** Medium

**Problem:** Implement a function that resolves after all promises settle (either resolve or reject), returning an array of result objects.

**Solution:**

```javascript
function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;
    const iterable = Array.from(promises);

    if (iterable.length === 0) {
      return resolve([]);
    }

    for (let i = 0; i < iterable.length; i++) {
      Promise.resolve(iterable[i])
        .then(value => {
          results[i] = { status: "fulfilled", value };
        })
        .catch(reason => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === iterable.length) {
            resolve(results);
          }
        });
    }
  });
}

// Tests
const p1 = Promise.resolve(1);
const p2 = Promise.reject("Error");
const p3 = Promise.resolve(3);

promiseAllSettled([p1, p2, p3]).then(console.log);
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected", reason: "Error" },
//   { status: "fulfilled", value: 3 }
// ]
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Frontend Relevance:** Useful when you want to fire multiple requests and handle both successes and failures individually — e.g., loading multiple independent widgets on a dashboard where one failure shouldn't block others.

---

### 6. Implement Array.prototype.map (Polyfill)

**Difficulty:** Medium

**Problem:** Implement a polyfill for `Array.prototype.map`.

**Solution:**

```javascript
Array.prototype.myMap = function(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = new Array(this.length);

  for (let i = 0; i < this.length; i++) {
    if (i in this) { // Handle sparse arrays
      result[i] = callback.call(thisArg, this[i], i, this);
    }
  }

  return result;
};

// Tests
const arr = [1, 2, 3];
console.log(arr.myMap(x => x * 2)); // [2, 4, 6]

// Sparse array test
const sparse = [1, , 3]; // eslint-disable-line no-sparse-arrays
console.log(sparse.myMap(x => x * 2)); // [2, empty, 6]

// thisArg test
const multiplier = { factor: 2 };
const nums = [1, 2, 3];
const multiplied = nums.myMap(function(x) {
  return x * this.factor;
}, multiplier);
console.log(multiplied); // [2, 4, 6]
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Frontend Relevance:** **Very common polyfill question.** Tests understanding of `this` binding, sparse arrays, and array iteration. Map is the most commonly used array method in React for rendering lists (`items.map(item => <Item key={item.id} />)`).

---

### 7. Implement Array.prototype.reduce (Polyfill)

**Difficulty:** Medium

**Problem:** Implement a polyfill for `Array.prototype.reduce`.

**Solution:**

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator = arguments.length >= 2 ? initialValue : this[0];
  let startIndex = arguments.length >= 2 ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};

// Tests
console.log([1, 2, 3].myReduce((acc, cur) => acc + cur, 0)); // 6
console.log([1, 2, 3].myReduce((acc, cur) => acc + cur)); // 6 (no initial value)
console.log([].myReduce((acc, cur) => acc + cur, 0)); // 0

// Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.myReduce((acc, cur) => acc.concat(cur), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

**Time Complexity:** O(n)
**Space Complexity:** O(1)

**Frontend Relevance:** Tests deeper understanding of array iteration. Reduce is powerful for transforming API responses, computing derived data in React components, building lookup maps from arrays, and aggregating state data.

---

### 8. Implement Function.prototype.bind (Polyfill)

**Difficulty:** Medium

**Problem:** Implement a polyfill for `Function.prototype.bind`.

**Solution:**

```javascript
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind called on incompatible " + this);
  }

  const fn = this;

  const boundFunction = function(...innerArgs) {
    // Handle new operator (constructor call)
    if (this instanceof boundFunction) {
      // "this" is the newly created instance
      return new fn(...args, ...innerArgs);
    }

    return fn.apply(context, [...args, ...innerArgs]);
  };

  // Preserve prototype for constructor calls
  boundFunction.prototype = Object.create(fn.prototype);

  return boundFunction;
};

// Tests
const module = {
  x: 42,
  getX() {
    return this.x;
  },
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // undefined (loses context)

const boundGetX = unboundGetX.myBind(module);
console.log(boundGetX()); // 42

// Partial application
function add(a, b, c) {
  return a + b + c;
}
const add5 = add.myBind(null, 2, 3);
console.log(add5(4)); // 9
```

**Time Complexity:** O(1) for bind, O(n) for call
**Space Complexity:** O(1)

**Frontend Relevance:** **Common question.** Tests deep understanding of `this` binding in JavaScript — critical knowledge for React class components, event handlers, and understanding why React hooks exist. Understanding bind helps debug common "cannot read property of undefined" errors in React.

---

### 9. Deep Clone an Object

**Difficulty:** Hard

**Problem:** Implement a deep clone function that handles all JavaScript types including circular references.

**Example:**
```
Input: const obj = { a: 1, b: { c: 2 }, d: [1, 2, { e: 3 }] }
Output: Deep copy with no reference sharing
```

**Solution:**

```javascript
function deepClone(value, cache = new WeakMap()) {
  // Handle primitives and functions
  if (value === null || typeof value !== "object") {
    return value;
  }

  // Handle circular references
  if (cache.has(value)) {
    return cache.get(value);
  }

  let cloned;

  // Handle Date
  if (value instanceof Date) {
    cloned = new Date(value.getTime());
  }
  // Handle RegExp
  else if (value instanceof RegExp) {
    cloned = new RegExp(value.source, value.flags);
  }
  // Handle Map
  else if (value instanceof Map) {
    cloned = new Map();
    cache.set(value, cloned);
    value.forEach((val, key) => {
      cloned.set(deepClone(key, cache), deepClone(val, cache));
    });
    return cloned;
  }
  // Handle Set
  else if (value instanceof Set) {
    cloned = new Set();
    cache.set(value, cloned);
    value.forEach(val => {
      cloned.add(deepClone(val, cache));
    });
    return cloned;
  }
  // Handle Array
  else if (Array.isArray(value)) {
    cloned = [];
    cache.set(value, cloned);
    for (let i = 0; i < value.length; i++) {
      if (i in value) {
        cloned[i] = deepClone(value[i], cache);
      }
    }
    return cloned;
  }
  // Handle Object
  else {
    // Handle objects with custom prototypes
    cloned = Object.create(Object.getPrototypeOf(value));
    cache.set(value, cloned);

    // Handle Symbol keys
    const allKeys = [
      ...Object.getOwnPropertyNames(value),
      ...Object.getOwnPropertySymbols(value),
    ];

    for (const key of allKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor && !descriptor.enumerable && !("value" in descriptor)) {
        // Skip non-enumerable getters/setters — copy the descriptor
        Object.defineProperty(cloned, key, descriptor);
      } else {
        cloned[key] = deepClone(value[key], cache);
      }
    }

    return cloned;
  }
}

// Tests
const original = {
  num: 1,
  str: "hello",
  bool: true,
  nullVal: null,
  arr: [1, 2, { nested: true }],
  obj: { a: { b: { c: 3 } } },
  date: new Date("2024-01-01"),
  regex: /test/g,
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
  [Symbol("sym")]: "symbol value",
};

// Circular reference test
original.self = original;

const cloned = deepClone(original);
console.log(cloned);
console.log(cloned.arr !== original.arr); // true (different arrays)
console.log(cloned.arr[2] !== original.arr[2]); // true (different nested objects)
console.log(cloned.date !== original.date); // true (different Date objects)
console.log(cloned.self === cloned); // true (circular reference preserved)
```

**Time Complexity:** O(n) where n is the number of properties
**Space Complexity:** O(n) + O(d) where d is the depth of nesting

**Frontend Relevance:** **Very common advanced question.** Deep cloning is essential in React for immutable state updates, especially when dealing with nested objects in Redux or Context. Understanding the nuances (circular refs, Symbols, Maps, Sets, prototypes) demonstrates senior-level JavaScript knowledge. Know when to use `structuredClone()` (built-in browser API) vs implementing manually.

---

### 10. Deep Equality Check

**Difficulty:** Medium

**Problem:** Implement a deep equality function that compares two values for structural equality.

**Example:**
```
Input: { a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }
Output: true
```

**Solution:**

```javascript
function deepEqual(a, b, visited = new WeakSet()) {
  // Same reference or both primitives with same value
  if (Object.is(a, b)) return true;

  // If either is null or not an object
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // Handle circular references
  if (visited.has(a) || visited.has(b)) return false;
  visited.add(a);
  visited.add(b);

  // Handle Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // Handle Map
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key), visited)) {
        return false;
      }
    }
    return true;
  }

  // Handle Set
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }

  // Handle Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!(i in a) && !(i in b)) continue;
      if (!deepEqual(a[i], b[i], visited)) return false;
    }
    return true;
  }

  // Handle Object
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key], visited)) return false;
  }

  return true;
}

// Tests
console.log(deepEqual(1, 1)); // true
console.log(deepEqual("hello", "hello")); // true
console.log(deepEqual(null, null)); // true
console.log(deepEqual(
  { a: 1, b: { c: 2 } },
  { a: 1, b: { c: 2 } }
)); // true
console.log(deepEqual(
  { a: 1, b: 2 },
  { a: 1, b: 3 }
)); // false
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual(NaN, NaN)); // true (Object.is handles this)

// React props comparison example
const prevProps = { items: [1, 2, 3], config: { theme: "dark" } };
const nextProps = { items: [1, 2, 3], config: { theme: "dark" } };
console.log(deepEqual(prevProps, nextProps)); // true

// Circular reference test
const circular = { a: 1 };
circular.self = circular;
const circular2 = { a: 1 };
circular2.self = circular2;
console.log(deepEqual(circular, circular2)); // true
```

**Time Complexity:** O(n) where n is the number of properties
**Space Complexity:** O(d) where d is the depth (for recursion stack + visited set)

**Frontend Relevance:** **Very common question.** Deep equality is the foundation of React's `React.memo`, `shouldComponentUpdate`, and understanding re-renders. Senior engineers should know why shallow comparison (===) is usually sufficient with immutable data, and when deep equality is needed.

---

### 11. JSON Validator

**Difficulty:** Easy

**Problem:** Check if a string is valid JSON.

**Solution:**

```javascript
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// More detailed version with error context
function parseJSON(str) {
  try {
    const result = JSON.parse(str);
    return { valid: true, data: result, error: null };
  } catch (error) {
    return {
      valid: false,
      data: null,
      error: {
        message: error.message,
        position: error.message.match(/position (\d+)/)?.[1],
      },
    };
  }
}

// Tests
console.log(isValidJSON('{"name":"John","age":30}')); // true
console.log(isValidJSON('{"name": "John"')); // false
console.log(isValidJSON("null")); // true
console.log(isValidJSON("undefined")); // false

console.log(parseJSON("not json"));
// { valid: false, data: null, error: { message: "Unexpected token...", position: "1" } }
```

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Frontend Relevance:** JSON parsing is essential for handling API responses, localStorage data, and configuration files. The try/catch pattern is the standard approach in production React apps.

---

### 12. Flatten Nested Array

**Difficulty:** Medium

**Problem:** Flatten a nested array to a specified depth.

**Example:**
```
Input: [1, [2, [3, [4]]]], depth = 2
Output: [1, 2, 3, [4]]

Input: [1, [2, [3, [4]]]], depth = Infinity
Output: [1, 2, 3, 4]
```

**Solution:**

```javascript
// Recursive solution
function flatten(arr, depth = Infinity) {
  if (depth <= 0) return [...arr];

  const result = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Using reduce
function flattenReduce(arr, depth = Infinity) {
  if (depth <= 0) return [...arr];

  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 0) {
      acc.push(...flattenReduce(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

// Iterative with stack (for very deep arrays, avoids stack overflow)
function flattenIterative(arr, depth = Infinity) {
  const result = [];
  const stack = arr.map(item => ({ item, depth }));

  while (stack.length > 0) {
    const { item, depth: currentDepth } = stack.pop();

    if (Array.isArray(item) && currentDepth > 0) {
      stack.push(
        ...item.map(subItem => ({ item: subItem, depth: currentDepth - 1 }))
      );
    } else {
      result.push(item);
    }
  }

  return result.reverse();
}

// Tests
console.log(flatten([1, [2, [3, [4]]]], 1)); // [1, 2, [3, [4]]]
console.log(flatten([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]
console.log(flatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
console.log(flatten([[1, 2], [3, [4, 5]]], Infinity)); // [1, 2, 3, 4, 5]

// Real-world use: flattening API response data
const apiResponse = {
  users: [
    { id: 1, roles: ["admin", "editor"] },
    { id: 2, roles: ["viewer"] },
  ],
};
// Get all unique roles
const allRoles = [...new Set(flatten(apiResponse.users.map(u => u.roles)))];
console.log(allRoles); // ["admin", "editor", "viewer"]
```

**Time Complexity:** O(n) where n is total number of elements (including nested)
**Space Complexity:** O(n) for result + O(d) for recursion stack

**Frontend Relevance:** Useful for normalizing nested API responses, processing tree-like state structures, and flattening deeply nested comment threads or category hierarchies. Be prepared to discuss recursion depth limits and the iterative alternative.

---

### 13. Memoize Function

**Difficulty:** Medium

**Problem:** Implement a generic memoization function that caches function results based on arguments.

**Solution:**

```javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    // Use JSON.stringify as default key (handles primitives, arrays, plain objects)
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Advanced version with custom key resolver
function memoizeAdvanced(fn, options = {}) {
  const {
    maxSize = Infinity,
    ttl = Infinity, // Time-to-live in ms
    resolver = (...args) => JSON.stringify(args),
  } = options;

  const cache = new Map();
  const timestamps = new Map();

  function getCached(key) {
    if (ttl !== Infinity && timestamps.has(key)) {
      const age = Date.now() - timestamps.get(key);
      if (age > ttl) {
        cache.delete(key);
        timestamps.delete(key);
        return undefined;
      }
    }
    return cache.get(key);
  }

  const memoized = function(...args) {
    const key = resolver(...args);
    const cached = getCached(key);

    if (cached !== undefined) {
      return cached;
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    timestamps.set(key, Date.now());

    // Evict oldest if over maxSize
    if (cache.size > maxSize) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
      timestamps.delete(oldestKey);
    }

    return result;
  };

  memoized.cache = cache;
  memoized.clear = () => {
    cache.clear();
    timestamps.clear();
  };

  return memoized;
}

// Tests
let callCount = 0;
const expensiveFn = (n) => {
  callCount++;
  return n * 2;
};

const memoizedFn = memoize(expensiveFn);
console.log(memoizedFn(5)); // 10 (callCount = 1)
console.log(memoizedFn(5)); // 10 (returned from cache)
console.log(callCount); // 1
console.log(memoizedFn(10)); // 20 (callCount = 2)
console.log(callCount); // 2

// Fibonacci with memoization
const fib = memoize(function(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});
console.log(fib(50)); // 12586269025 (instant, without memoize this would hang)
```

**Time Complexity:** O(1) for cache hit, O(n) for cache miss (where n is cost of fn)
**Space Complexity:** O(number of unique calls)

**Frontend Relevance:** **Very common question.** Memoization is the core concept behind `React.useMemo`, `React.useCallback`, and `React.memo`. Understanding when and how to cache function results is crucial for React performance optimization. The advanced version with TTL and maxSize resembles production caching strategies.

---

### 14. Event Emitter (Pub/Sub Pattern)

**Difficulty:** Medium

**Problem:** Implement a simple event emitter with on, off, emit, and once methods.

**Solution:**

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this; // For chaining
  }

  off(event, listener) {
    if (!this.events.has(event)) return this;

    const listeners = this.events.get(event);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      this.events.delete(event);
    }

    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;

    const listeners = [...this.events.get(event)];
    listeners.forEach(listener => {
      listener(...args);
    });

    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }

  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
    return this;
  }

  listenerCount(event) {
    const listeners = this.events.get(event);
    return listeners ? listeners.length : 0;
  }
}

// Tests
const emitter = new EventEmitter();

const logListener = (msg) => console.log("Log:", msg);
emitter.on("log", logListener);
emitter.emit("log", "Hello"); // "Log: Hello"

emitter.off("log", logListener);
emitter.emit("log", "Should not appear"); // Nothing logged

// once
let onceCount = 0;
emitter.once("onceEvent", () => { onceCount++; });
emitter.emit("onceEvent");
emitter.emit("onceEvent");
console.log(onceCount); // 1

// Multiple listeners
emitter.on("data", (x) => console.log("A:", x));
emitter.on("data", (x) => console.log("B:", x));
emitter.emit("data", "test");
// "A: test"
// "B: test"

console.log(emitter.listenerCount("data")); // 2
emitter.removeAllListeners("data");
console.log(emitter.listenerCount("data")); // 0
```

**Time Complexity:** O(1) for on/emit, O(n) for off (n = number of listeners)
**Space Complexity:** O(number of events × listeners)

**Frontend Relevance:** **Common question.** The Event Emitter pattern is the foundation of many frontend libraries and patterns. Understanding it helps with:
- React's synthetic event system
- Redux dispatch/subscribe
- WebSocket message handling
- Custom event-driven architectures
- Browser events (addEventListener)

---

### 15. Currying

**Difficulty:** Medium

**Problem:** Implement a function that transforms a function with multiple arguments into a sequence of nested functions, each taking a single argument.

**Example:**
```
Input: curry(add(1, 2, 3)) → curry(add)(1)(2)(3) → 6
```

**Solution:**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

// Arrow function version
const curryArrow = (fn) => {
  const curried = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...nextArgs) => curried(...args, ...nextArgs);
  return curried;
};

// Tests
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// Real-world: URL builder
const buildURL = curry((base, path, params) => {
  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";
  return `${base}${path}${query}`;
});

const api = buildURL("https://api.example.com");
const usersEndpoint = api("/users");
console.log(usersEndpoint({ page: 1, limit: 10 }));
// "https://api.example.com/users?page=1&limit=10"
```

**Time Complexity:** O(1) per curried call
**Space Complexity:** O(k) where k is number of collected arguments

**Frontend Relevance:** Currying appears in:
- Redux middleware (`store => next => action => ...`)
- React higher-order components (`withRouter(WrappedComponent)`)
- Event handler factories
- Configuration with partial application

---

# Section 6: React-Specific Problems

---

### 1. Implement useDebounce Hook

**Difficulty:** Medium

**Problem:** Create a custom React hook that debounces a value.

**Solution:**

```javascript
import { useState, useEffect } from "react";

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage in a search component
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`/api/search?q=${debouncedSearch}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// Alternative: useDebouncedCallback (debounce the function itself)
function useDebouncedCallback(callback, delay = 300, deps = []) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, ...deps]);
}
```

**Time Complexity:** O(1) per render
**Space Complexity:** O(1)

**Frontend Relevance:** **Must-know custom hook.** Debouncing is essential for optimizing search inputs, form auto-save, window resize handlers, and any rapid-fire state updates. This is one of the most common custom hooks asked in React interviews.

---

### 2. Implement useThrottle Hook

**Difficulty:** Medium

**Problem:** Create a custom React hook that throttles a value or function.

**Solution:**

```javascript
import { useState, useEffect, useRef } from "react";

function useThrottle(value, limit = 200) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= limit) {
      setThrottledValue(value);
      lastRun.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastRun.current = Date.now();
      }, limit - timeSinceLastRun);

      return () => clearTimeout(timer);
    }
  }, [value, limit]);

  return throttledValue;
}

// useThrottledCallback version
function useThrottledCallback(callback, limit = 200, deps = []) {
  const lastRun = useRef(0);
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= limit) {
      callbackRef.current(...args);
      lastRun.current = now;
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        lastRun.current = Date.now();
        timeoutRef.current = null;
      }, limit - timeSinceLastRun);
    }
  }, [limit]);
}

// Usage: Scroll position tracker
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 100);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return <div>Scroll position: {throttledScrollY}px</div>;
}
```

**Time Complexity:** O(1) per render
**Space Complexity:** O(1)

**Frontend Relevance:** **Must-know custom hook.** Throttling is essential for scroll handlers, resize events, drag-and-drop, and animation frame callbacks. Know the difference: debounce waits for a pause, throttle guarantees regular intervals.

---

### 3. Implement usePrevious Hook

**Difficulty:** Easy

**Problem:** Create a custom React hook that tracks the previous value of a state or prop.

**Solution:**

```javascript
import { useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage: Detect value changes
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevCount !== undefined && count !== prevCount) {
      console.log(`Count changed from ${prevCount} to ${count}`);
    }
  }, [count, prevCount]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Generic version with comparator
function usePreviousWithComparator(value, isEqual = (a, b) => a === b) {
  const ref = useRef({ current: value, previous: undefined });

  if (!isEqual(ref.current.current, value)) {
    ref.current = { current: value, previous: ref.current.current };
  }

  return ref.current.previous;
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** **Very common custom hook question.** Understanding `usePrevious` demonstrates mastery of `useRef` for mutable values that persist across renders without causing re-renders. Useful for animations, transitions, and detecting real value changes (not just identity changes).

---

### 4. Implement useLocalStorage Hook

**Difficulty:** Easy

**Problem:** Create a custom React hook that syncs state with localStorage.

**Solution:**

```javascript
import { useState, useEffect, useCallback } from "react";

function useLocalStorage(key, initialValue) {
  // Lazy initializer: read from localStorage only on first render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync to localStorage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Handle cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          setStoredValue(e.newValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setStoredValue, remove];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [user, setUser, removeUser] = useLocalStorage("user", null);

  return (
    <div className={theme}>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={removeUser}>Logout</button>
        </div>
      ) : (
        <button onClick={() => setUser({ name: "Alice" })}>Login</button>
      )}
    </div>
  );
}
```

**Time Complexity:** O(1) for read/write
**Space Complexity:** O(1)

**Frontend Relevance:** **Common custom hook question.** Tests understanding of lazy initializers, error handling in localStorage (quota exceeded, private browsing), cross-tab synchronization, and JSON serialization. Essential for persisting user preferences, themes, and draft data.

---

### 5. Implement useMediaQuery Hook

**Difficulty:** Easy

**Problem:** Create a custom React hook that tracks a CSS media query.

**Solution:**

```javascript
import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = (event) => {
      setMatches(event.matches);
    };

    // Modern browsers
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Usage
function ResponsiveComponent() {
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isMedium = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isLarge = useMediaQuery("(min-width: 1025px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div>
      <p>Device size: {isSmall ? "Small" : isMedium ? "Medium" : "Large"}</p>
      <p>Theme: {prefersDark ? "Dark" : "Light"}</p>
      {prefersReducedMotion && <p>Reduced motion enabled</p>}
    </div>
  );
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** **Common custom hook question.** Essential for building responsive React components, implementing dark mode, and accessibility (prefers-reduced-motion). Also tests understanding of `matchMedia` API and event listener cleanup.

---

### 6. Implement useIntersectionObserver Hook

**Difficulty:** Medium

**Problem:** Create a custom React hook that detects when an element enters the viewport.

**Solution:**

```javascript
import { useRef, useState, useEffect } from "react";

function useIntersectionObserver(options = {}) {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    triggerOnce = false,
  } = options;

  const ref = useRef(null);
  const [entry, setEntry] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, entry, isIntersecting };
}

// Usage: Lazy image loading
function LazyImage({ src, alt, placeholder }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} style={{ minHeight: 200, background: "#f0f0f0" }}>
      {isIntersecting ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}>
          {placeholder || "Loading..."}
        </div>
      )}
    </div>
  );
}

// Usage: Infinite scroll
function InfiniteScroll({ onLoadMore, hasMore, children }) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (isIntersecting && hasMore) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, onLoadMore]);

  return (
    <div>
      {children}
      {hasMore && <div ref={ref}>Loading more...</div>}
    </div>
  );
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** Essential for lazy loading images, infinite scroll, animation triggers, and tracking ad/viewport visibility. Tests understanding of the Intersection Observer API, cleanup, and single-fire vs continuous observation patterns.

---

### 7. Implement useClickOutside Hook

**Difficulty:** Easy

**Problem:** Create a custom React hook that detects clicks outside a referenced element.

**Solution:**

```javascript
import { useEffect, useRef } from "react";

function useClickOutside(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    // Use mousedown instead of click for better UX (fires before blur)
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handler]);

  return ref;
}

// Usage: Dropdown menu
function DropdownMenu({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(!isOpen)}>{trigger}</button>
      {isOpen && (
        <div style={{ position: "absolute", top: "100%", right: 0 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// Usage: Modal
function Modal({ isOpen, onClose, children }) {
  const ref = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex",
      alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.5)",
    }}>
      <div ref={ref} style={{ background: "white", padding: 20, borderRadius: 8 }}>
        {children}
      </div>
    </div>
  );
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** **Very common custom hook question.** Essential for dropdowns, modals, popovers, tooltips, and any UI element that should close when clicking outside. Tests understanding of refs, event propagation, and cleanup.

---

### 8. Implement useWindowSize Hook

**Difficulty:** Easy

**Problem:** Create a custom React hook that tracks the window dimensions.

**Solution:**

```javascript
import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      // Debounce resize for performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return windowSize;
}

// Usage: Responsive canvas
function ResponsiveCanvas() {
  const { width, height } = useWindowSize();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      // Re-draw canvas content
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, width, height);
    }
  }, [width, height]);

  return <canvas ref={canvasRef} />;
}

// Usage: Detect if mobile
function useIsMobile(breakpoint = 768) {
  const { width } = useWindowSize();
  return width < breakpoint;
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** Essential for responsive layouts, canvas resizing, data visualization that adapts to viewport, and conditional rendering based on screen size. The debounced version is important for performance (avoiding excessive re-renders on resize).

---

### 9. Implement useFetch Hook

**Difficulty:** Medium

**Problem:** Create a custom React hook for data fetching with loading, error, and abort states.

**Solution:**

```javascript
import { useState, useEffect, useRef, useCallback } from "react";

function useFetch(url, options = {}) {
  const {
    immediate = true,
    method = "GET",
    headers = {},
    body = null,
    transform = (data) => data,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (overrideUrl, overrideOptions = {}) => {
    const fetchUrl = overrideUrl || url;
    const { method: overrideMethod, headers: overrideHeaders, body: overrideBody } = overrideOptions;

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fetchUrl, {
        method: overrideMethod || method,
        headers: { ...headers, ...overrideHeaders },
        body: overrideBody || body,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      const transformed = transform(json);
      setData(transformed);
      return transformed;
    } catch (err) {
      if (err.name === "AbortError") {
        // Request was aborted, don't set error state
        return null;
      }
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body, transform]);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [execute, immediate]);

  return { data, loading, error, execute, refetch: execute };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(
    `https://api.example.com/users/${userId}`,
    { immediate: !!userId }
  );

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// With mutation
function CreateUserForm() {
  const { execute, loading, error } = useFetch(null, { method: "POST" });
  const [result, setResult] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const newUser = await execute("/api/users", {
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      setResult(newUser);
    } catch (err) {
      // Error is already in state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {loading && <p>Creating user...</p>}
      {error && <p>Error: {error}</p>}
      {result && <p>Created: {result.id}</p>}
    </form>
  );
}
```

**Time Complexity:** O(1) for hook setup, O(response time) for fetch
**Space Complexity:** O(response data size)

**Frontend Relevance:** **Must-know custom hook pattern.** Every React developer should know how to build a robust data-fetching hook. Tests understanding of: AbortController for cleanup, loading/error/success state management, request deduplication, and immutability. This is the foundation that libraries like React Query, SWR, and RTK Query are built on.

---

### 10. Implement useTimer / useInterval Hook

**Difficulty:** Easy

**Problem:** Create a custom React hook for managing intervals with proper cleanup.

**Solution:**

```javascript
import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

// Usage
function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setCount(c => c + 1);
  }, isRunning ? 1000 : null); // Passing null pauses the interval

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Countdown timer
function Countdown({ initial = 60, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(initial);

  useInterval(() => {
    setTimeLeft(t => {
      if (t <= 1) {
        onComplete?.();
        return 0;
      }
      return t - 1;
    });
  }, timeLeft > 0 ? 1000 : null);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** **Common custom hook.** Essential for timers, countdowns, carousels, polling, auto-refresh, and animation loops. Tests understanding of ref pattern (avoiding stale closures) and cleanup.

---

### 11. Implement useStateWithHistory Hook

**Difficulty:** Medium

**Problem:** Create a custom React hook that maintains state history with undo/redo capability.

**Solution:**

```javascript
import { useState, useCallback, useRef } from "react";

function useStateWithHistory(initialValue, { capacity = 10 } = {}) {
  const [value, setValue] = useState(initialValue);
  const historyRef = useRef([initialValue]);
  const pointerRef = useRef(0);

  const set = useCallback((nextValue) => {
    const resolvedValue =
      typeof nextValue === "function"
        ? nextValue(historyRef.current[pointerRef.current])
        : nextValue;

    // Truncate future history if we're not at the end
    if (pointerRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, pointerRef.current + 1);
    }

    historyRef.current.push(resolvedValue);

    // Enforce capacity
    if (historyRef.current.length > capacity) {
      historyRef.current.shift();
    }

    pointerRef.current = historyRef.current.length - 1;
    setValue(resolvedValue);
  }, [capacity]);

  const undo = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const redo = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const clear = useCallback(() => {
    historyRef.current = [historyRef.current[pointerRef.current]];
    pointerRef.current = 0;
  }, []);

  return {
    value,
    set,
    undo,
    redo,
    clear,
    history: historyRef.current,
    pointer: pointerRef.current,
    canUndo: pointerRef.current > 0,
    canRedo: pointerRef.current < historyRef.current.length - 1,
  };
}

// Usage: Drawing canvas with undo/redo
function DrawingCanvas() {
  const { value: strokes, set: setStrokes, undo, redo, canUndo, canRedo } =
    useStateWithHistory([]);

  const addStroke = (newStroke) => {
    setStrokes(prev => [...prev, newStroke]);
  };

  return (
    <div>
      <div>
        <button onClick={undo} disabled={!canUndo}>Undo</button>
        <button onClick={redo} disabled={!canRedo}>Redo</button>
      </div>
      {/* Canvas rendering based on strokes */}
    </div>
  );
}
```

**Time Complexity:** O(1) per operation
**Space Complexity:** O(capacity) for history storage

**Frontend Relevance:** **Senior-level custom hook.** Demonstrates understanding of mutable refs for cross-render state, undo/redo patterns, and controlled state updates. Useful for drawing apps, text editors, form builders, and any app requiring history navigation.

---

### 12. Implement useAsyncTask Hook

**Difficulty:** Medium

**Problem:** Create a custom React hook that manages the lifecycle of an async task with loading, success, and error states.

**Solution:**

```javascript
import { useState, useCallback, useRef, useEffect } from "react";

function useAsyncTask(asyncFunction, { immediate = false, onSuccess, onError } = {}) {
  const [status, setStatus] = useState("idle"); // idle | pending | success | error
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);
  const cancellableRef = useRef(null);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (cancellableRef.current) {
        cancellableRef.current.cancel?.();
      }
    };
  }, []);

  const execute = useCallback(async (...args) => {
    setStatus("pending");
    setError(null);

    const cancellable = asyncFunction(...args);
    cancellableRef.current = cancellable;

    try {
      const result = await cancellable;

      if (isMountedRef.current) {
        setValue(result);
        setStatus("success");
        onSuccess?.(result);
      }

      return result;
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
        setStatus("error");
        onError?.(err);
      }
      throw err;
    }
  }, [asyncFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setStatus("idle");
    setValue(null);
    setError(null);
  }, []);

  // Auto-execute on mount if immediate
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    reset,
    status,
    value,
    error,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    isIdle: status === "idle",
  };
}

// Usage
function UserData({ userId }) {
  const { execute, value, isLoading, isError, error, reset } = useAsyncTask(
    useCallback(async (id) => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    }, []),
    { immediate: !!userId }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <Error message={error.message} onRetry={() => execute(userId)} />;
  if (!value) return null;

  return <div>{value.name}</div>;
}
```

**Time Complexity:** O(1) for hook setup
**Space Complexity:** O(1)

**Frontend Relevance:** **Senior-level pattern.** Shows understanding of async state management, unmount safety, loading/error/success state machines, and composable async logic. This is the pattern behind production-grade data fetching hooks.

---

### 13. Implement useContextWrapper Hook

**Difficulty:** Easy

**Problem:** Create a helper function that creates a typed Context with a Provider and consumer hook, including a guard for usage outside the provider.

**Solution:**

```javascript
import { createContext, useContext, createElement } from "react";

function createContextWrapper(useValue, displayName = "Context") {
  const Context = createContext(null);
  Context.displayName = displayName;

  function Provider({ children, ...props }) {
    const value = useValue(props);
    return createElement(Context.Provider, { value }, children);
  }

  function useProvidedContext() {
    const context = useContext(Context);

    if (context === null) {
      throw new Error(
        `${displayName}Provider is missing. Wrap your component tree with <${displayName}Provider>.`
      );
    }

    return context;
  }

  return { Provider, useProvidedContext, Context };
}

// Usage
function useAuthValue({ initialUser = null } = {}) {
  const [user, setUser] = useState(initialUser);

  const login = useCallback((credentials) => {
    return fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }).then(res => res.json()).then(setUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
}

const { Provider: AuthProvider, useProvidedContext: useAuth } =
  createContextWrapper(useAuthValue, "Auth");

// App
function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

// Consumer (no need to import context, just useAuth)
function MainContent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** **Common pattern.** Shows understanding of React Context, compound components, and error boundaries for context. This pattern is used in production by libraries like React Router, Radix UI, and state management libraries.

---

### 14. Implement withLoader HOC

**Difficulty:** Medium

**Problem:** Create a Higher-Order Component that adds loading state management.

**Solution:**

```javascript
import React, { useState, useCallback } from "react";

function withLoader(WrappedComponent, { loadingComponent: LoadingComponent = null } = {}) {
  function WithLoader(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const withLoading = useCallback(async (asyncFn) => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFn();
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    }, []);

    if (loading && LoadingComponent) {
      return <LoadingComponent />;
    }

    return (
      <WrappedComponent
        {...props}
        loading={loading}
        error={error}
        withLoading={withLoading}
        clearError={() => setError(null)}
      />
    );
  }

  WithLoader.displayName = `WithLoader(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return WithLoader;
}

// Usage
function UserProfile({ userId, loading, error, withLoading, clearError, ...props }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    withLoading(async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    });
  }, [userId, withLoading]);

  if (loading) return <div className="skeleton">Loading...</div>;
  if (error) return <div className="error">{error} <button onClick={clearError}>Dismiss</button></div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

const UserProfileWithLoader = withLoader(UserProfile, {
  loadingComponent: () => <div className="spinner" />,
});

// Usage
<UserProfileWithLoader userId={123} />
```

**Time Complexity:** O(1)
**Space Complexity:** O(1)

**Frontend Relevance:** **Medium-common HOC question.** Tests understanding of higher-order components, composition patterns, and the difference between HOCs, hooks, and render props. While hooks have largely replaced HOCs, understanding this pattern is crucial for legacy codebases and library consumption.

---

# Section 7: Frontend / Browser API Problems

---

### 1. Implement a Simple Virtual DOM

**Difficulty:** Hard

**Problem:** Implement a basic virtual DOM with createElement, render, and diffing.

**Solution:**

```javascript
// Virtual DOM implementation
const vdom = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.flat().map(child =>
          typeof child === "object" ? child : vdom.createTextElement(child)
        ),
      },
    };
  },

  createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  },
};

// Render virtual DOM to real DOM
function render(vnode, container) {
  if (!container._rootVNode) {
    container._rootVNode = vnode;
    container._realDOM = _createDOM(vnode);
    container.appendChild(container._realDOM);
  } else {
    const patches = diff(container._rootVNode, vnode);
    applyPatches(container._realDOM, patches);
    container._rootVNode = vnode;
  }
}

function _createDOM(vnode) {
  if (vnode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vnode.props.nodeValue);
  }

  const dom = document.createElement(vnode.type);

  // Set properties (skip children)
  Object.keys(vnode.props)
    .filter(key => key !== "children")
    .forEach(key => {
      if (key.startsWith("on")) {
        const event = key.slice(2).toLowerCase();
        dom.addEventListener(event, vnode.props[key]);
      } else if (key === "className") {
        dom.setAttribute("class", vnode.props[key]);
      } else if (key === "style" && typeof vnode.props[key] === "object") {
        Object.assign(dom.style, vnode.props[key]);
      } else {
        dom.setAttribute(key, vnode.props[key]);
      }
    });

  // Render children
  vnode.props.children.forEach(child => {
    dom.appendChild(_createDOM(child));
  });

  return dom;
}

// Diffing algorithm
function diff(oldVNode, newVNode) {
  const patches = [];

  if (!oldVNode) {
    patches.push({ type: "CREATE", newVNode });
  } else if (!newVNode) {
    patches.push({ type: "REMOVE" });
  } else if (oldVNode.type !== newVNode.type) {
    patches.push({ type: "REPLACE", newVNode });
  } else if (newVNode.type === "TEXT_ELEMENT") {
    if (oldVNode.props.nodeValue !== newVNode.props.nodeValue) {
      patches.push({ type: "TEXT", value: newVNode.props.nodeValue });
    }
  } else {
    // Diff props
    const propPatches = diffProps(oldVNode.props, newVNode.props);
    if (propPatches.length > 0) {
      patches.push({ type: "PROPS", patches: propPatches });
    }

    // Diff children
    const childPatches = diffChildren(
      oldVNode.props.children,
      newVNode.props.children
    );
    if (childPatches.length > 0) {
      patches.push({ type: "CHILDREN", patches: childPatches });
    }
  }

  return patches;
}

function diffProps(oldProps, newProps) {
  const patches = [];

  // Find removed and changed props
  Object.keys(oldProps)
    .filter(key => key !== "children")
    .forEach(key => {
      if (!(key in newProps)) {
        patches.push({ type: "REMOVE_PROP", key });
      } else if (oldProps[key] !== newProps[key]) {
        patches.push({ type: "SET_PROP", key, value: newProps[key] });
      }
    });

  // Find new props
  Object.keys(newProps)
    .filter(key => key !== "children" && !(key in oldProps))
    .forEach(key => {
      patches.push({ type: "SET_PROP", key, value: newProps[key] });
    });

  return patches;
}

function diffChildren(oldChildren, newChildren) {
  const patches = [];
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    patches.push(...diff(oldChildren[i], newChildren[i]));
  }

  return patches;
}

function applyPatches(dom, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case "TEXT":
        dom.nodeValue = patch.value;
        break;
      case "REPLACE": {
        const newDom = _createDOM(patch.newVNode);
        dom.parentNode.replaceChild(newDom, dom);
        break;
      }
      case "PROPS":
        applyPropsPatches(dom, patch.patches);
        break;
      case "CHILDREN": {
        const childNodes = Array.from(dom.childNodes);
        patch.patches.forEach((childPatch, i) => {
          if (childNodes[i]) {
            applyPatches(childNodes[i], [childPatch]);
          } else if (childPatch.type === "CREATE") {
            dom.appendChild(_createDOM(childPatch.newVNode));
          }
        });
        break;
      }
    }
  });
}

function applyPropsPatches(dom, patches) {
  patches.forEach(patch => {
    if (patch.type === "SET_PROP") {
      if (patch.key.startsWith("on")) {
        const event = patch.key.slice(2).toLowerCase();
        dom.addEventListener(event, patch.value);
      } else if (patch.key === "className") {
        dom.setAttribute("class", patch.value);
      } else if (patch.key === "style" && typeof patch.value === "object") {
        Object.assign(dom.style, patch.value);
      } else {
        dom.setAttribute(patch.key, String(patch.value));
      }
    } else if (patch.type === "REMOVE_PROP") {
      dom.removeAttribute(patch.key);
    }
  });
}

// Usage
const element = vdom.createElement(
  "div",
  { className: "container" },
  vdom.createElement("h1", { style: { color: "red" } }, "Hello, Virtual DOM!"),
  vdom.createElement("p", {}, "This is a paragraph.")
);

// render(element, document.getElementById("root"));

// Re-render with changes
const element2 = vdom.createElement(
  "div",
  { className: "container updated" },
  vdom.createElement("h1", { style: { color: "blue" } }, "Hello, Updated!"),
  vdom.createElement("p", {}, "This paragraph was updated."),
  vdom.createElement("span", {}, "New element!")
);

// render(element2, document.getElementById("root"));
```

**Time Complexity:** O(n) for createElement, O(n) for diff (where n is number of nodes)
**Space Complexity:** O(n) for VDOM tree, O(p) for patches

**Frontend Relevance:** **Hard/Advanced question.** Understanding virtual DOM is crucial for React developers — it's the foundation of React's reconciliation algorithm. This demonstrates deep knowledge of:
- How React.createElement works
- How React compares old and new DOM trees
- Why keys are needed for lists
- What happens during re-renders
- Performance optimization strategies (bailout, batching)

---

### 2. Implement LocalStorage with TTL

**Difficulty:** Medium

**Problem:** Implement a storage wrapper that supports time-to-live (TTL) expiration.

**Solution:**

```javascript
const storageWithTTL = {
  set(key, value, ttlMs = null) {
    const item = {
      value,
      expiresAt: ttlMs ? Date.now() + ttlMs : null,
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.warn("Storage quota exceeded or unavailable:", e);
    }
  },

  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;

      const item = JSON.parse(raw);

      // Check expiration
      if (item.expiresAt && Date.now() > item.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  // Remove all expired items
  cleanUp() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      this.get(key); // get() automatically removes expired items
    }
  },
};

// Cache API responses with TTL
const cache = {
  async fetch(url, options = {}) {
    const { ttl = 5 * 60 * 1000 } = options; // Default 5 minutes

    const cached = storageWithTTL.get(`cache:${url}`);
    if (cached !== null) {
      return cached;
    }

    const response = await fetch(url);
    const data = await response.json();
    storageWithTTL.set(`cache:${url}`, data, ttl);
    return data;
  },

  invalidate(url) {
    storageWithTTL.remove(`cache:${url}`);
  },
};

// Usage
async function getUser(userId) {
  return cache.fetch(`/api/users/${userId}`, { ttl: 60000 });
}
```

**Time Complexity:** O(1)
**Space Complexity:** O(n) where n is number of stored items

**Frontend Relevance:** Tests understanding of localStorage limitations (quota, synchronous, string-only), JSON serialization, and cache invalidation strategies. Useful for implementing client-side caching, session management, and offline-capable applications.

---

### 3. Implement URL Parameter Parser

**Difficulty:** Easy

**Problem:** Parse URL query string parameters into an object.

**Solution:**

```javascript
function parseQueryString(queryString) {
  // Remove leading '?' if present
  const query = queryString.startsWith("?") ? queryString.slice(1) : queryString;

  if (!query) return {};

  return query.split("&").reduce((params, pair) => {
    if (!pair) return params;

    const [encodedKey, encodedValue] = pair.split("=");
    const key = decodeURIComponent(encodedKey);
    const value = encodedValue !== undefined
      ? decodeURIComponent(encodedValue.replace(/\+/g, " "))
      : "";

    // Handle duplicate keys (turn into array)
    if (key in params) {
      params[key] = Array.isArray(params[key])
        ? [...params[key], value]
        : [params[key], value];
    } else {
      params[key] = value;
    }

    return params;
  }, {});
}

function buildQueryString(params) {
  const pairs = Object.entries(params).flatMap(([key, value]) => {
    if (value === null || value === undefined) return [];

    const encode = (val) => encodeURIComponent(String(val));
    const encodedKey = encode(key);

    if (Array.isArray(value)) {
      return value.map(v => `${encodedKey}=${encode(v)}`);
    }

    return [`${encodedKey}=${encode(value)}`];
  });

  return pairs.length > 0 ? `?${pairs.join("&")}` : "";
}

// Tests
console.log(parseQueryString("?name=John&age=30&city=New+York"));
// { name: "John", age: "30", city: "New York" }

console.log(parseQueryString("?filter=apple&filter=banana"));
// { filter: ["apple", "banana"] }

console.log(parseQueryString(""));
// {}

console.log(buildQueryString({ name: "John", age: 30, tags: ["react", "js"] }));
// "?name=John&age=30&tags=react&tags=js"

// React Router integration
function useQueryParams() {
  const { search } = window.location;
  return useMemo(() => parseQueryString(search), [search]);
}

function useQueryParam(key, defaultValue = null) {
  const params = useQueryParams();
  return params[key] ?? defaultValue;
}
```

**Time Complexity:** O(n) where n is number of query parameters
**Space Complexity:** O(n)

**Frontend Relevance:** Essential for client-side routing, filter state synchronization with URL, sharing page state via links, and implementing search with shareable URLs. Tests understanding of URL encoding, edge cases (missing values, duplicate keys, encoding).

---

### 4. Implement Cookie Manager

**Difficulty:** Easy

**Problem:** Implement a cookie management utility with set, get, and delete functions.

**Solution:**

```javascript
const cookieManager = {
  set(name, value, options = {}) {
    const { domain, path = "/", expires, maxAge, secure, httpOnly, sameSite = "Lax" } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (domain) cookieString += `; Domain=${domain}`;
    if (path) cookieString += `; Path=${path}`;
    if (maxAge) cookieString += `; Max-Age=${maxAge}`;

    if (expires) {
      const expiresStr = expires instanceof Date
        ? expires.toUTCString()
        : new Date(expires).toUTCString();
      cookieString += `; Expires=${expiresStr}`;
    }

    if (secure) cookieString += "; Secure";
    if (httpOnly) cookieString += "; HttpOnly";
    if (sameSite) cookieString += `; SameSite=${sameSite}`;

    document.cookie = cookieString;
  },

  get(name) {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
    }, {});

    return cookies[name] ?? null;
  },

  remove(name, options = {}) {
    this.set(name, "", {
      ...options,
      maxAge: 0,
      expires: new Date(0),
    });
  },

  getAll() {
    if (!document.cookie) return {};

    return document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
      return acc;
    }, {});
  },

  has(name) {
    return this.get(name) !== null;
  },
};

// Usage
cookieManager.set("theme", "dark", { maxAge: 86400, path: "/" });
cookieManager.set("session", "abc123", { httpOnly: true, secure: true, sameSite: "Strict" });

console.log(cookieManager.get("theme")); // "dark"
console.log(cookieManager.getAll()); // { theme: "dark", session: "abc123" }
console.log(cookieManager.has("session")); // true

cookieManager.remove("theme");
console.log(cookieManager.get("theme")); // null
```

**Time Complexity:** O(n) for getAll/get, O(1) for set/remove
**Space Complexity:** O(n)

**Frontend Relevance:** Understanding cookies is essential for authentication flows, CSRF protection, session management, and analytics. Tests understanding of cookie attributes (SameSite, Secure, HttpOnly, Path), encoding, and the differences between cookies, localStorage, and sessionStorage.

---

### 5. Implement a Simple Pub/Sub Store (Mini Redux)

**Difficulty:** Medium

**Problem:** Implement a simple state management store similar to Redux.

**Solution:**

```javascript
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    // Return unsubscribe function
    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  // Initialize by dispatching a dummy action
  dispatch({ type: "@@INIT" });

  return { getState, dispatch, subscribe };
}

// Example: Counter reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + (action.payload || 1) };
    case "DECREMENT":
      return { ...state, count: state.count - (action.payload || 1) };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

// Example: Todo reducer
function todoReducer(state = { todos: [], filter: "ALL" }, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// Composing reducers (like combineReducers)
function combineReducers(reducers) {
  return function combinedReducer(state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

// Usage with React
function useStore(store) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());
    return unsubscribe;
  }, [store]);

  return store;
}

// Example
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer,
});

const store = createStore(rootReducer, { counter: { count: 0 }, todos: { todos: [], filter: "ALL" } });

// Subscribe
const unsubscribe = store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Dispatch actions
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "ADD_TODO", payload: "Learn Redux" });
store.dispatch({ type: "TOGGLE_TODO", payload: 1 });

unsubscribe();
```

**Time Complexity:** O(1) for getState/dispatch, O(n) for subscribe (n = listener count)
**Space Complexity:** O(state size + listener count)

**Frontend Relevance:** **Common senior-level question.** Understanding how Redux works internally demonstrates deep knowledge of state management. Tests: immutability, pure functions, unidirectional data flow, pub/sub pattern, and reducer composition. This pattern applies to Context + useReducer, Zustand, and other state solutions.

---

# Section 8: Problem-Solving Patterns for Frontend Interviews

---

### Pattern 1: Sliding Window

**Use cases:** Longest substring, subarray with condition, rate limiting

```javascript
// Template
function slidingWindow(nums, k) {
  const result = [];
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    windowSum += nums[windowEnd]; // Add element to window

    // Check if window size is reached
    if (windowEnd >= k - 1) {
      result.push(windowSum / k); // Process window
      windowSum -= nums[windowStart]; // Remove left element
      windowStart++; // Slide window
    }
  }

  return result;
}
```

**Frontend Relevance:** Analyzing rolling metrics from analytics, managing visible items in virtual scroll, auto-scroll behavior in chat apps, and progressive loading patterns.

---

### Pattern 2: Two Pointers

**Use cases:** Palindrome, pair sum, removing duplicates, comparing arrays

```javascript
// Template
function twoPointer(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Process arr[left] and arr[right]
    if (someCondition(arr[left], arr[right])) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}
```

**Frontend Relevance:** Comparing two sorted data sources, finding matching UI elements, validating bidirectional form inputs, and synchronizing two list views (e.g., available/selected items).

---

### Pattern 3: Frequency Counter / Hash Map

**Use cases:** Anagrams, duplicates, character counting, lookup optimization

```javascript
// Template
function frequencyCounter(arr) {
  const counter = {};

  for (const item of arr) {
    counter[item] = (counter[item] || 0) + 1;
  }

  // Use counter for lookups
  return counter;
}
```

**Frontend Relevance:** Aggregating analytics data, counting element occurrences in the DOM, building lookup maps for fast data access in React components, and deduplicating list data before rendering.

---

### Pattern 4: Recursion / Tree Traversal

**Use cases:** Tree traversal, nested comments, file explorers, menu rendering

```javascript
// Template: DFS
function dfs(node, visit) {
  if (!node) return;

  visit(node);
  node.children?.forEach(child => dfs(child, visit));
}

// Template: BFS
function bfs(root, visit) {
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    visit(node);
    queue.push(...(node.children || []));
  }
}
```

**Frontend Relevance:** **Essential for React interviews.** Recursive patterns are used for rendering nested comments, tree menus, file explorers, organizational charts, and any hierarchical data in React components. Testing tree rendering with recursion is a common React interview challenge.

---

### Pattern 5: Memoization / Caching

**Use cases:** Expensive computations, API response caching, dynamic programming

```javascript
// Template
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**Frontend Relevance:** **Core React concept.** Memoization is the foundation of `React.useMemo`, `React.useCallback`, `React.memo`, and `reselect`. Understanding when and how to cache is essential for React performance optimization.

---

### Pattern 6: Debounce & Throttle

**Use cases:** Search input, resize handler, scroll handler, auto-save

```javascript
// Quick reference
function debounce(fn, delay) { /* see full implementation above */ }
function throttle(fn, limit) { /* see full implementation above */ }
```

**Frontend Relevance:** **Must-know patterns.** Every React developer uses these daily. Debounce: search inputs, form validation, auto-save. Throttle: scroll listeners, resize handlers, animation frames.

---

### Pattern 7: Async Control Flow

**Use cases:** Sequential API calls, parallel requests, retry logic, race conditions

```javascript
// Retry with exponential backoff
async function retry(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Sequential execution
async function sequential(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

// With concurrency limit
async function parallelWithLimit(tasks, limit = 3) {
  const results = [];
  const queue = [...tasks];
  let running = 0;
  let index = 0;

  async function worker() {
    while (index < queue.length) {
      const currentIndex = index++;
      results[currentIndex] = await queue[currentIndex]();
    }
  }

  const workers = Array(Math.min(limit, tasks.length))
    .fill(null)
    .map(worker);

  await Promise.all(workers);
  return results;
}
```

**Frontend Relevance:** **Critical pattern.** Async control flow is used for: fetching related data (user → posts → comments), handling race conditions in autocomplete, implementing retry logic for failed API calls, and batch processing with concurrency limits for performance.

---

### Pattern 8: Observer / Pub-Sub

**Use cases:** Event handling, state management, cross-component communication

```javascript
// Quick reference — see EventEmitter implementation above
```

**Frontend Relevance:** Foundation of browser events (addEventListener), React's event system, Redux, and custom event-driven architectures in JavaScript.

---

---

# Quick Reference: Most Commonly Asked React/Frontend Coding Questions

| # | Problem | Category | Frequency |
|---|---------|----------|-----------|
| 1 | **Two Sum** | Array | ⭐⭐⭐⭐⭐ |
| 2 | **Valid Parentheses** | Stack | ⭐⭐⭐⭐⭐ |
| 3 | **Implement Debounce** | JavaScript | ⭐⭐⭐⭐⭐ |
| 4 | **Implement Throttle** | JavaScript | ⭐⭐⭐⭐⭐ |
| 5 | **Deep Clone** | JavaScript | ⭐⭐⭐⭐⭐ |
| 6 | **Deep Equal** | JavaScript | ⭐⭐⭐⭐ |
| 7 | **Implement Promise.all** | JavaScript | ⭐⭐⭐⭐ |
| 8 | **Flatten Array** | JavaScript | ⭐⭐⭐⭐ |
| 9 | **Event Emitter** | JavaScript | ⭐⭐⭐⭐ |
| 10 | **Custom Hook: useDebounce** | React | ⭐⭐⭐⭐⭐ |
| 11 | **Custom Hook: useLocalStorage** | React | ⭐⭐⭐⭐ |
| 12 | **Custom Hook: usePrevious** | React | ⭐⭐⭐⭐ |
| 13 | **Custom Hook: useClickOutside** | React | ⭐⭐⭐⭐ |
| 14 | **Custom Hook: useFetch** | React | ⭐⭐⭐⭐ |
| 15 | **Custom Hook: useIntersectionObserver** | React | ⭐⭐⭐⭐ |
| 16 | **Binary Search** | Search | ⭐⭐⭐⭐ |
| 17 | **Valid Palindrome** | String | ⭐⭐⭐ |
| 18 | **Valid Anagram** | String | ⭐⭐⭐ |
| 19 | **Longest Substring Without Repeating** | String | ⭐⭐⭐ |
| 20 | **Contains Duplicate** | Array | ⭐⭐⭐ |
| 21 | **Maximum Subarray** | Array/DP | ⭐⭐⭐ |
| 22 | **LRU Cache** | Design | ⭐⭐⭐ |
| 23 | **Function.prototype.bind (Polyfill)** | JavaScript | ⭐⭐⭐ |
| 24 | **Array.prototype.map (Polyfill)** | JavaScript | ⭐⭐⭐ |
| 25 | **Memoize Function** | JavaScript | ⭐⭐⭐ |
| 26 | **Mini Redux / createStore** | State Mgmt | ⭐⭐⭐ |
| 27 | **Simple Virtual DOM** | React | ⭐⭐ |
| 28 | **Currying** | JavaScript | ⭐⭐ |
| 29 | **Retry with Exponential Backoff** | Async | ⭐⭐⭐ |
| 30 | **Implement useTimer Hook** | React | ⭐⭐⭐ |

---

# Tips for React/Frontend Coding Interviews

## 1. Communication is Key
- **Think out loud** — Explain your approach before writing code
- **Clarify assumptions** — Ask about input constraints, edge cases, browser compatibility
- **Discuss trade-offs** — Time vs space complexity, readability vs optimization, bundle size impact

## 2. Start Simple, Then Optimize
- Begin with a working brute-force solution
- Then optimize for time or space
- Explain why the optimization matters in a frontend context

## 3. Test Your Code
- Walk through your solution with sample inputs
- Cover edge cases: empty inputs, null/undefined, special characters, large datasets
- Consider async error cases (network failure, timeout, abort)

## 4. Write Clean Code
- Use meaningful variable names
- Handle errors gracefully
- Keep functions focused (single responsibility)
- Use modern ES6+ syntax (but be ready to explain it)

## 5. React/Frontend-Specific Tips
- **Know your hooks** — useState, useEffect, useRef, useMemo, useCallback, useReducer
- **Understand re-renders** — What causes them, how to prevent unnecessary ones
- **State management** — When to use local state, Context, or external libraries
- **Performance** — Code splitting, lazy loading, virtualization, memoization
- **Accessibility** — ARIA attributes, keyboard navigation, focus management
- **Browser APIs** — IntersectionObserver, ResizeObserver, matchMedia, requestAnimationFrame
- **Know the React 18+ features** — Concurrent rendering, automatic batching, transitions, Suspense

## 6. Common Interviewer Follow-ups
- "Can you make it more efficient?" (Optimize time/space)
- "How would this work in React?" (Apply solution to component context)
- "What if the input is very large?" (Virtualization, pagination, chunking)
- "How would you handle errors?" (Error boundaries, fallback UI, retry logic)
- "What about accessibility?" (ARIA, keyboard support, screen readers)
- "How does this affect bundle size?" (Tree shaking, code splitting)
- "Can you make this reusable?" (Custom hooks, HOCs, render props)

## 7. Study Plan

| Week | Focus |
|------|-------|
| 1 | JavaScript fundamentals (closures, this, prototypes, async) |
| 2 | Array/String problems + Two Sum, Valid Parentheses |
| 3 | Custom React hooks (useDebounce, useFetch, useLocalStorage) |
| 4 | JavaScript polyfills (bind, map, deep clone, Promise.all) |
| 5 | React internals (virtual DOM, reconciliation, re-renders) |
| 6 | System design (component architecture, state management, performance) |
| 7 | Build projects (CRUD app, real-time features, drag-and-drop) |
| 8 | Mock interviews + behavioral questions |

---

*This guide covers 100+ coding problems organized by category, specifically curated for React and frontend engineering roles. Master these patterns to ace your technical interviews.*
