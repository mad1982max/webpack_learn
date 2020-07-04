async function start() {
    return await Promise.resolve('async is workking')
}


start().then(msg => console.log(msg));


class T {
    static time = new Date();
}

console.log('**time now', T.time);

import('lodash').then(_=> {
    console.log('RANDOM:', _.random(0,42,true));
    
})
