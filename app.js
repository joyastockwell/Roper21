const itemList = document.querySelector('#item-list');

var storage = firebase.storage();

var storageRef = storage.ref();

async function getCowData(doc)  {
    var str = "";
    // Not very elegant, but I searched for an hour for an alternative and couldn't find one!
    await db.collection('prototype cows').doc(doc.id)
        .collection('tags').orderBy("text").get().then(snapshot => {
            console.log("getting cow data");
            snapshot.docs.forEach( doc => {
                str = str.concat("Last Weigh-in: ");
                str = str.concat(doc.data().last_weight_in);
                str = str.concat("\n");
            })
        })
    return str;
}

function renderCow(doc) {
    let li = document.createElement('li');
    let cowData = document.createElement('span');

    
    // retrieve tags
    getCowData(doc).then(str => {
        tagList.textContent = str;
    });

    li.appendChild(cowData);
    itemList.appendChild(li);
}


// renders each item in the Items collection in Firebase
db.collection('prototype cows').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log("Cow name:" + doc.data().name);
        //renderCow(doc);
    })
})


db.collection('DataUpdates').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        console.log("Course: " + doc.data().Course);
        //console.log("Serial Number: " + doc.data()["Serial Number"]);
        //if(doc.data().Serial_Number);
    })
})

/*db.collection('prototype cows').doc(doc.id).get().then(snapshot => {
    console.log("getting cow data");
    str = str.concat("Last Update: ");

    str = str.concat(doc.data()["last update"]);
    str = str.concat("\n");
    console.log("hey" + str);
});
*/