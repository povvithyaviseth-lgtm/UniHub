
            Server 
    (Boots Express + mounts routes)
                ↓

            Routes 
        (API endpoints)
                ↓

            Controllers 
    (Handle req/res, call services)
                ↓

            Services 
    (Business logic, DB operations)
                ↓

            Models 
        (Mongoose schema & queries)
        
                ↓
            MongoDB


---> Folder & File Naming Conventions: <----
Folders are plural: 
    controllers/
    routes/

Files are singular and use dot-type naming: 
    student.controller.js
    clubManagement.controller.js