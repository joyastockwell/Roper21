const itemList = document.querySelector('#item-list');

var storage = firebase.storage();

var storageRef = storage.ref();

async function getCowData(doc)  {
    const lastSortedData = await db.collection('Last DataUpdate Sorted').doc('0').get();
    if (!lastSortedData.exists) {
        console.log('Last DataUpdate sorted unknown');
    }
    const lastSortedID = lastSortedData.data()["last number"];

    const UnsortedDataUpdates = await db.collection('DataUpdates').where(firebase.firestore.FieldPath.documentId(), ">", lastSortedID).get();
    console.log(UnsortedDataUpdates);
    UnsortedDataUpdates.docs.forEach((doc) => {
        console.log("dream o' me")
        console.log(doc.data());
    });


    // Not very elegant, but I searched for an hour for an alternative and couldn't find one!
    await db.collection('prototype cows').doc(doc.id).get().then(snapshot => {
     });
}

function renderCow(doc) {
    let li = document.createElement('li');
    let cowData = document.createElement('span');

    
    // retrieve tags
    getCowData(doc).then(str => {
        cowData.textContent = str;
    });

    li.appendChild(cowData);
    itemList.appendChild(li);
}


// renders each item in the Items collection in Firebase
db.collection('Serial Number Cows').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log("name: " + doc.data().name);
        renderCow(doc);
    })
})