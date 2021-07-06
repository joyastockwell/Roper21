const itemList = document.querySelector('#item-list');

var storage = firebase.storage();

var storageRef = storage.ref();

async function sortCowUpdates()  {
    const lastSortedData = await db.collection('Last DataUpdate Sorted').doc('0').get();
    if (!lastSortedData.exists) {
        console.log('Last DataUpdate sorted unknown');
    }
    const lastSortedID = lastSortedData.data()["last number"];
    console.log(lastSortedID);

    //const UnsortedDataUpdates = await db.collection('DataUpdates').where(firebase.firestore.FieldPath.documentId(), ">", lastSortedID).get();
    const UnsortedDataUpdates = await db.collection('DataUpdates').where(firebase.firestore.FieldPath.documentId(), ">", "202106231350475844").get();
    UnsortedDataUpdates.docs.forEach((doc) => {
        // get cow of same serial number
        var currSerialNumber = doc.data()["Serial Number"];
        console.log(currSerialNumber);
        db.collection("Serial Number Cows").where('currSerialNumber', '==', currSerialNumber).get().then((data) => {
            if(data.size < 1) {
                console.log("Serial number not found");
                return;
            }
            data.forEach(cow => {
                console.log(cow.data().name);
            });
            if(data.size > 1) {
                console.log("Warning. Multiple cows with " + currSerialNumber + " as current serial number. Using data for only " + cow.name);
            }

        });
        // store serial number in serial numbers collection
    });
}

sortCowUpdates();