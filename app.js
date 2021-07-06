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
        var currSerial = doc.data()["Serial Number"];
        console.log(currSerial);
        db.collection("Cows").where('currSerial', '==', currSerial).get().then((data) => {
            if(data.size < 1) {
                console.log("Serial number not found");
                return;
            }
            if(data.size > 1) {
                throw 'Warning. Multiple Cows With ' + currSerial;
                //console.log("Warning. Multiple cows with " + currSerial);
            }
          
            data.forEach(cow => {
                console.log(cow.data().name);

            });

        });
        // store serial number in serial numbers collection
    });

    
}

sortCowUpdates();