//Needed to start up the database
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

function openDatabase()
{
    // Actually creating the database 
    var database;
    var request = window.indexedDB.open("NoteDatabase", 3);
    request.onerror = function(event)
    {
        alert("Database failed to open");
    }
    request.onsuccess = function(event)
    {
        database = event.target.result;
    }

    // Creating objectstore with name notes and the key will be NoteID
    request.onupgradeneeded = function(event)
    {
        var objectStore = db.createObjectStore("notes", { keyPath: "NoteID"});
        objectStore.createIndex('lectureID', 'lectureID', { unique: false});
        objectStore.createIndex('slideID', 'slideID', { unique: false});
        objectStore.createIndex('note', 'note', { unique: false});
    }
}

function addNote(lectureID, slideID, noteID, note, blob)
{
    var obj = {LectureID: lectureID, SlideID: slideID, NoteID: noteID, Note: note};
    if(typeof blob != 'undefined')
        obj.blob = blob;
    var store = getObjectStore("notes", 'readwrite');
    var req;
    try{
        req = store.add(obj);
    } catch (e) {
        if (e.name == "DataCloneError")
            displayActionFailure("This engine doesn't know how to clone a Blob");
    }
    
    /*var request = db.transaction(["note"], "readwrite")
    .objectStore("note")*/
}

function getNotes(store)
{
    store = getObjectStore("notes", "readonly");
    var req;
    req = store.count();
    
    var i =0;
    req = store.opencursor();
    req.onsuccess = function(evt)
    {
        var cursor = evt.target.result;
        
        if(cursor)
            {
                req = store.get(cursor.key);
                req.onsuccess = function (evt)
                {
                    var value = evt.target.result;
                    var list_item = $('<liv>' + '[' + cursor.key + ']' "LectureID: " + value.LectureID + " NoteID: " + value.NoteID);
                }
                cursor.continue();
                i++;
            }
        else{
            alert("No more entries");
        }
    }
}
