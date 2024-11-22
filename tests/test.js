import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Ramp up to 10 users
        { duration: '1m', target: 10 }, // Maintain 10 users
        { duration: '30s', target: 0 }, // Ramp down
    ],
};

export default function () {
    const urls = open('./urls.csv').split('\n');
    urls.shift(); // Remove the header
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    http.get(randomUrl);
    sleep(1);
}
