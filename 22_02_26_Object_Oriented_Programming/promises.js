/*

First we need to understand why we need promises.
Since javascript is a single-threaded language, it can only execute one task at a time. 
This means that if we have a long-running task, such as fetching data from an API, it will block the main thread and prevent any other code from executing until it is finished. 
This can lead to a poor user experience, as the application may become unresponsive.

*/

function pepareOrderCB(dish, cb){
    setTimeout(() => cb(null, {dish, status: 'prepared'}), 1000);
}

function pickUpOrderCB(order, cb){
    setTimeout(() => cb(null, {...order, status: 'picked up'}), 1000);
}

function deliverOrderCB(order, cb){
    setTimeout(() => cb(null, {...order, status: 'delivered'}), 1000);
}

pepareOrderCB('Pizza', (err, preparedOrder) => {
    if(err) {
        console.error(err);
        return;
    }
    pickUpOrderCB(preparedOrder, (err, pickedUpOrder) => {
        if(err) {
            console.error(err);
            return;
        }
        deliverOrderCB(pickedUpOrder, (err, deliveredOrder) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log(deliveredOrder);
        });
    });
});

/*
As you can see, the code above is very nested and difficult to read. This is known as "callback hell". 
To avoid this, we can use promises.
*/

// pending, fulfilled, rejected - these are the three states of a promise

