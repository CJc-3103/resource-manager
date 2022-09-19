import http from '../utils/http';
import store from '@/store';

// topic
export function fetchTopic() {
    return http.get('');
}

// resource
export function fetchResource() {
    return http.get('');
}

// tag
export function fetchTag() {
    return http.get('');
}