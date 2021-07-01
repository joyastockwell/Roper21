const itemList = document.querySelector('#item-list');

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
        renderCow(doc);
    })
})