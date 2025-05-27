const STORAGE_KEY = 'SELECT_STORAGE';

function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to parse storage:', e);
    }
    return {
        hostel: {
            number: 0,
            floor: 0,
            room: 0,
        }
    };
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save storage:', e);
    }
}

export function getHostelNumber() {
    const state = loadState();
    return state.hostel.number;
}

export function setHostelNumber(number) {
    const state = loadState();
    state.hostel.number = number;
    saveState(state);
}

export function getHostelFloor() {
    const state = loadState();
    return state.hostel.floor;
}

export function setHostelFloor(floor) {
    const state = loadState();
    state.hostel.floor = floor;
    saveState(state);
}

export function getHostelRoom() {
    const state = loadState();
    return state.hostel.room;
}

export function setHostelRoom(room) {
    const state = loadState();
    state.hostel.room = room;
    saveState(state);
}

// export function addHostelRoom(room) {
//     const state = loadState();
//     state.hostel.rooms.push(room);
//     saveState(state);
// }
//
// export function removeHostelRoom(room) {
//     const state = loadState();
//     const idx = state.hostel.rooms.indexOf(room);
//     if (idx !== -1) {
//         state.hostel.rooms.splice(idx, 1);
//         saveState(state);
//     }
// }

export function getHostel() {
    const state = loadState();
    return state.hostel;
}
