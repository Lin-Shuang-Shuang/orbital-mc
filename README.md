# Milestone 1 submission
## Team name
NoTiFy

## Proposed level of achievement 
Gemini

## Aim
We aim to create a website whereby students can collaborate to
create and share notes that supports MarkUp languages and
commonly-used note taking formats. By providing a user-friendly
and feature-rich environment for note-taking and sharing, our
platform will facilitate effective learning and knowledge sharing
among students. In addition, our goal is to provide a comprehensive
study material creation tool that streamlines the process of
organising and accessing notes for students. By offering a
centralized platform for note-taking, our tool will enable students
to easily locate and review their study materials in a convenient
and efficient way.

## Motivation
<p align="justify">
As computer science students, the modules that we have taken so far have required us to create our own notes, as well as cheatsheets for the exams. A commonly used tool for collaborative notemaking amongst students is Google Docs. However, we realised that it was almost impossible to create a cheatsheet that was space-efficient, due to the strict formatting rules permitted on Google Docs. It was also difficult to format the notes in the ways we desire. 
</p>

<p align="justify">
One possible solution to these issues was to use other platforms such as Overleaf, which supports MarkUp languages, thus allowing for more control over how we can format our notes. Platforms like Miro and Canva are also helpful if we intend to create a mindmap or brainstorm for ideas with others. However, by using multiple applications to manage our notes, we increase the inconvenience we face while trying to revise for our exams. 
</p>

<p align="justify">
Hence, we wondered if it was possible to have a collaborative website that has a text editor which supports MarkUp languages as well as other note formats, such as an exam cheatsheet, flashcards, post-it notes and diagrams, thus allowing us to manage all our notes on a single platform.
</p>

## Vision
<p align ="justify">
We envision NoTiFy to be an important collaborative note taking tool where users will be able to easily create and share their knowledge and content. This will be achieved through the users employing the available features on the website, such as MarkUp language support, allowing for a more convenient and flexible note-taking experience. Users can also save time by choosing from the wide range of templates that we provide for various note types.
</p>

## User stories
<p align="justify">
  
1. As a student, I can create a cheat sheet for my exam using the markdown language note creation feature on NoTiFy so that I have greater control over the typesetting and formatting of my document than if I used Google Docs or Microsoft Word that only provides a rich text editor.
  
2. As a student, I can collaborate with friends to create notes or cheatsheet, so that I can spare more time to work on other assignments and projects.
  
3. As a student, I can collaborate with friends to make notes, and read their understanding of the topic and compare it with mine so that I can identify which parts I need to work on and learn from them. As a student, if I have doubts about my friends’ notes, I can point them out by commenting on that specific section, so that they can learn and correct their mistakes.
  
4. As a student who uses many different note formats to study for various subjects (e.g. flashcards for medical science, cheat sheets for math and slides for history) I want all my notes all in one platform so that I can access them easily without having many applications and websites open just to find my notes.
</p>

## Features
- Webpage
  - Hosting
    - Proposed: MongoDB database and collections to be hosted on MongoDB Atlas, 
    - Current progress: MongoDB database and website are hosted locally. 
  - Account management
    - Proposed: Users will be able to register accounts with email authentication.
    - Current progress: Basic registration and login features implemented. Authentication with JsonWebToken implemented.
  - File management
    - Proposed: Users will be able to upload, share with other users, edit and download their files on the platform. 
    - Current progress: Working on rudimentary file upload and download with the Multer and GridFS packages.
- Text editor
  - Rich text editor:
    - Proposed: An in-house rich text editor whereby users are able to select if they want to create a regular document or a document that supports MarkUp source code.
    - Current progress: Implemented a rich-text-editor using the Quill package.
  - MarkUp language support:
    - Proposed: Users will be able to use our text editors to type in MarkUp source code (Markdown and LaTeX support planned) and export the file as a PDF. There will be a real time side-by-side view of MarkUp source code and output PDF implemented as well. 
    - Current progress: Identified React packages such as KaTeX and react-markdown that will help us implement this feature.
  - Additional types of notes:
    - Proposed: Users will be able to select which type of document they would like to create when they attempt to create a new set of notes. Planned types of notes: A4 cheat sheet, post-it notes, flashcards, mind-maps, diagrams.
- Collaborative Features
  - File sharing: 
    - Proposed: Users will be able to share files with each other. Once a user is granted permission to access a file, he/she will be able to edit and download it.
  - Concurrent editing:
    - Proposed: Multiple users will be able to edit the same file concurrently. 
  - Communication:
    - Proposed: A comment and reply system will be implemented, along with a live chat function.
## Timeline
## Milestone 1

| Tasks                                                        | Description                                                  | Member Assigned to task   | Date              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------- | ----------------- |
| Preliminary familiarization with required software and materials. | Familiarization with JavaScript.<br />Familiarization with React, NodeJS and MongoDB. | Jeremy<br />Shuang Shuang | 13/5/23 - 20/5/23 |
| Website skeleton                                             | Full stack React-based webpage using NodeJS, ExpressJS with MongoDB integration. Registration feature implemented. | Jeremy                    | 20/5/23 - 22/5/23 |
| Website styling                                              | Webpage styling with React and HTML.                         | Shuang Shuang             | 21/5/23 - 28/5/23 |
| Login, logout and authentication                             | Implementation of login, logout and JsonWebToken based authentication. | Jeremy                    | 22/5/23 - 23/5/23 |
| Rich text editor integration                                 | Rich text editor page implemented with external packages.    | Shuang Shuang             | 23/5/23           |
| Research into required packages and ideation on implementation of key<br />features. |                                                              | Jeremy<br />Shuang Shuang | 24/5/23 - 26/5/23 |
| Preparation for Milestone 1                                  | Refactoring code and debugging, preparing documentation.     | Jeremy<br />Shuang Shuang | 27/5/23 - 28/5/23 |

### Evaluation at Milestone 1: 29/5/23

- Ideation
- Proof-of-concept:
  - Webapp built with MERN stack
    - Basic features:
      - Registration
      - Login
      - Authentication
    - Key features:
      - Rich text editor

## Milestone 2

| Tasks                                                        | Description                                                  | Member Assigned to task   | Date                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------- | ---------------------------------- |
| Refactoring code                                             | Refactoring and debugging code from Milestone 1 in order to support further features. | Jeremy<br />Shuang Shuang | 29/5/23 - 4/6/23 <br />(Week 4)    |
| Text editor                                                  | Building a rich text editor from the ground up.              | Jeremy<br />Shuang Shuang | 29/5/23 - 11/6/23 <br />(Week 4/5) |
| MarkUp language support in text editor                       | Planned MarkUp languages to be supported: MarkDown, LaTeX.   | Jeremy<br />Shuang Shuang | 4/6/23 - 18/6/23 <br />(Week 5/6)  |
| Integration of file uploading, editing and downloading with text editor. | Allows users to open up the files they upload and edit them. | Jeremy                    | 11/6/23 - 18/6/23 <br />(Week 6)   |
| Further types of notes.                                      | Implementation of post-it notes.                             | Shuang Shuang             | 11/6/23 - 18/6/23 <br />(Week 6)   |
| Implementation of basic file sharing                         | Allow 2 users to share files with each other.                | Jeremy<br />Shuang Shuang | 11/6/23 - 18/6/23 <br />(Week 6)   |
| Preparation for Milestone 2                                  | Refactoring code and integration of features. Hosting of website, database, testing and debugging | Jeremy<br />Shuang Shuang | 18/6/23 - 26/6/23<br />(Week 7)    |

### Evaluation at Milestone 2: 26/5/23

- First working prototype:
  - File management:
    - Upload
    - Sharing between 2 accounts
    - Editing
    - Download 
  - Text editor:
    - Rich text editor
    - MarkDown, LaTeX support
  - Further features:
    - Post-it notes

## Milestone 3

| Tasks                            | Description                                                  | Member Assigned to task   | Date                                 |
| -------------------------------- | ------------------------------------------------------------ | ------------------------- | ------------------------------------ |
| Refactoring code                 | Refactoring and debugging code from Milestone 2 in order to support further features. | Jeremy<br />Shuang Shuang | 26/6/23 - 2/7/23 <br />(Week 8)      |
| Enhanced file sharing            | Allows multiple (>2) accounts to share and edit the same document.<br />Allows for concurrent editing of the same document. | Jeremy<br />Shuang Shuang | 26/6/23 - 9/7/23 <br />(Week 8/9)    |
| Further collaborative features   | Comment system.                                              | Jeremy<br />Shuang Shuang | 26/6/23 - 9/7/23 <br />(Week 8/9)    |
| Enhanced MarkUp language support | Side by side live view of source code and output.<br />Export to PDF. | Jeremy<br />Shuang Shuang | 2/6/23 - 9/7/23 <br />(Week 9)       |
| Further types of notes           | Cheat sheet                                                  | Jeremy<br />Shuang Shuang | 10/6/23 - 17/7/23 <br />(Week 10/11) |
| Preparation for Milestone 3      | Refactoring code and integration of features. Testing and debugging | Jeremy<br />Shuang Shuang | 18/6/23 - 24/7/23 <br />(Week 12)    |

### Evaluation at Milestone 3: 24/7/23

- Minimum viable product: MVP
  - Collaboration:
    - Concurrent editing
    - Multiple users
    - Comment system and live chat
  - Editor:
    - Side-by-side live view of MarkUp source code and output.
    - Export to PDF. 

## Splashdown

| Tasks                          | Description                                                  | Member Assigned to task   | Date                                 |
| ------------------------------ | ------------------------------------------------------------ | ------------------------- | ------------------------------------ |
| Refactoring code               | Refactoring and debugging code from Milestone 3 in order to support further features. | Jeremy<br />Shuang Shuang | 24/7/23 - 30/7/23 <br />(Week 13)    |
| Further collaborative features | Live chat.                                                   | Jeremy<br />Shuang Shuang | 31/7/23 - 6/8/23<br /> (Week 14)     |
| Further types of notes         | Flashcards, mind-maps, diagrams                              | Jeremy<br />Shuang Shuang | 31/7/23 - 13/8/23<br /> (Week 14/15) |
| Optimization and refinement    | Exploration of different modules and packages that can help the webpage run better and enhance user experience. | Jeremy<br />Shuang Shuang | 7/8/23 - 21/8/23 <br />(Week 15/16)  |
| Preparation for Splashdown     | Refactoring code and integration of features. Testing and debugging | Jeremy<br />Shuang Shuang | 14/8/23 - 23/8/23 <br />(Week 16)    |

### Evaluation at Splashdown:

- Refined minimum viable product

## Technology stack:
![Technology Stack](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/Technology%20Stack.drawio%20(3).png)

## Mockup and webpage flowchart:
![Main Page 1](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/mainpage_1.png)
![Main Page 2](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/mainpage_2.png)
![Main Page 3](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/mainpage_3.png)
![Main Page 4](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/mainpage_4.png)
![Dashboard](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/dashboard.png)
![Rich Text Editor](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/richtexteditor.png)
![Markdown](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/markdown.png)
![Webpage Flowchart](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/User%20flowchart.drawio%20(1).png)

## Technical proof:
### Homepage
![Homepage](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/Homepage.png)

### Create new account
![Create new account](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/CreateNewAccount.png)

### Login
![Login](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/Login.png)

### Text editor
![Text editor](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/Text%20Editor.png)

### Account saved to database
![Database](https://github.com/Lin-Shuang-Shuang/orbital-mc/blob/main/images/User%20Saved%20to%20Database.png)
