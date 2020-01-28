Part I

1. make a directory called first
   mkdir first
2. change directory to the first folder
   cd first
3. create a file called person.txt
   touch person.txt
4. change the name of person.txt to another.txt
   mv person.txt another.txt
5. make a copy of the another.txt file and call it copy.txt
   cp another.txt copy.txt
6. remove the copy.txt file
   rm copy.txt
7. make a copy of the first folder and call it second
   cp -r first second
8. delete the second folder
   rm -rf second

Part II

1. What does the man command do? Type in man rm. How do you scroll and get out?
   Brings up the manual for a specific command. Scroll: enter, Exit: q.
2. Look at the man page for ls. What does the -l flag do? What does the -a flag do?
   -l: Use a long listing format, -a: show hidden entries.
3. How do you jump between words in the terminal?
   Ctrl-left/Ctrl-right.
4. How do you get to the end of a line in terminal?
   Ctrl-e.
5. How do you move your cursor to the beginning in terminal?
   Ctrl-a.
6. How do you delete a word (without pressing backspace multiple times) in terminal?
   Ctrl-w.
7. What is the difference between a terminal and shell?
   The terminal is the physical program, the shell is the software running inside it.
8. What is an absolute path?
   The specific file path of a file or directory on the computer. Ex: C:/Users/User.
9. What is an relative path?
   The path of a file or directory on the computer relative to the current directory.
10. What is a flag? Give three examples of flags you have used.
    An option for a command. ls -a: shows all hidden files and folders, pwd -L: displays the logical current working directory, rm -rf: removes a folder and all subfolders recursively by force.
11. What do the r and f flags do with the rm command?
    -r: recursively removes all subfiles and folders within a directory. -f: remove without prompting.
