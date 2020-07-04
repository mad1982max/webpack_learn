import * as $ from 'jquery';

function createAnallitics(): object {
    let counter = 0;
    let isDestroyed: boolean = false;
    const listener = () => {
        counter++;
        console.log('counter: ', counter);
        
    };
    $(document).on('click', listener);

    return {
        destroy() {
            $(document).off('click', listener);
            isDestroyed = true
        },
        getClicks() {
            if(isDestroyed) return "Analitics is destroyed"
            return counter;
        }
    }
}

window['analitics'] = createAnallitics();