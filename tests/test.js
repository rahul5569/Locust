import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load URLs in the init stage (global scope)
const urls = new SharedArray('urls', function() {
    return open('./urls.csv')
        .split('\n')
        .slice(1)  // Remove header
        .filter(url => url.trim());  // Remove empty lines
});

export const options = {
    stages: [
        { duration: '30s', target: 10 },  // Ramp up to 10 users
        { duration: '1m', target: 10 },   // Maintain 10 users
        { duration: '30s', target: 0 },   // Ramp down
    ],
};

export default function () {
    if (urls.length === 0) {
        console.log('No URLs found in urls.csv');
        return;
    }
    
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    http.get(randomUrl.trim());
    sleep(1);
}