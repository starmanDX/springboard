Part I
Answer the following questions:

1. What git command creates a branch?
   git checkout -b (branch)
2. What is the difference between a fast-forward and recursive merge?
   Fast-forward merges current branch onto an unaltered branch.
   Recursive merges current branch onto a branch that has been altered since branching.
3. What git command changes to another branch?
   git checkout (branch)
4. What git command deletes a branch?
   git branch -D (branch)
5. How do merge conflicts happen?
   When a file that is being merged has been altered elsewhere since branching.

Part II

1. Practice with fast forward and recursive merges! Make a branch and add and commit onto it and merge it back into master.
   a) FF Merge 1. git checkout -b dev 2. modify/add/commit sample.txt 3. git checkout master 4. git merge dev
   b) Recursive Merge 1. git checkout -b dev 2. modify/add/commit sample.txt 3. git checkout -b dev2 4. modify/add/commit sample2.txt 5. git checkout master 6. git merge dev2 (FF merge) 7. git merge dev (recursive merge)

2. Try to create your own merge conflict by modifying the same file on two separate commits on two separate branches.
   a) Merge conflict 1. git checkout -b dev 2. modify/add/commit sample.txt 3. git checkout -b dev2 4. modify/add/commit sample.txt 5. git checkout master 6. git merge dev2 (FF merge) 7. git merge dev (merge conflict)
