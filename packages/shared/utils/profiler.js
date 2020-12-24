import seedrandom from "seedrandom";

const storeKey = "profiler-store";
const store = new Map(JSON.parse(localStorage.getItem(storeKey)));

export const reloadKey = "profiler-reload-times";
export const updateKey = "profiler-update-times";
export const updateId = "profile-update-button";

export const commonProfilerCallback = (
  id,
  phase,
  actualTime,
  baseTime,
  startTime,
  commitTime
) => {
  if (!store.has(id)) {
    store.set(id, []);
  }
  store.get(id).push({
    phase,
    actualTime,
    baseTime,
    startTime,
    commitTime,
  });

  window.requestIdleCallback(() => {
    localStorage.setItem(storeKey, JSON.stringify(Array.from(store.entries())));

    setTimeout(() => {
      const restTimes = +localStorage.getItem(reloadKey);
      if (restTimes > 0) {
        reloadNTimes(restTimes);
      }
    }, 500);

    setTimeout(() => {
      const restTimes = +localStorage.getItem(updateKey);
      if (restTimes > 0) {
        updateNTimes(restTimes);
      }
    }, 500);
  });
};

export function showAverageActualTime(
  id,
  { phase = "update", limit = 100, randomSeed = "hello" } = {}
) {
  const filteredList = (store.get(id) || []).filter(
    item => item.phase === phase
  );

  let finalList = [];
  if (filteredList.length <= limit) {
    finalList.push(...filteredList);
  } else {
    const filteredListLen = filteredList.length;
    const isUsedSet = new Set();
    const rng = seedrandom(randomSeed);
    while (finalList.length <= limit) {
      const index = Math.ceil(rng() * filteredListLen);
      if (isUsedSet.has(index)) {
        continue;
      }
      finalList.push(filteredList[index]);
      isUsedSet.add(index);
    }
  }

  const total = finalList.reduce(
    (total, { actualTime }) => total + actualTime,
    0
  );
  return total / finalList.length;
}

function reloadNTimes(n) {
  if (n > 0) {
    localStorage.setItem(reloadKey, n - 1);
  }
  window.location.reload();
}

function updateNTimes(n) {
  if (n > 0) {
    localStorage.setItem(updateKey, n - 1);
  }
  document.getElementById(updateId).click();
}

window.showAverageActualTime = showAverageActualTime;

window.showAllAverageActualTime = data => {
  const result = {};
  for (const id of store.keys()) {
    result[id] = {
      mount: showAverageActualTime(id, { phase: "mount", ...data }),
      update: showAverageActualTime(id, { phase: "update", ...data }),
    };
  }
  console.table(result);
};

window.showProfilerStore = () => {
  return store;
};

window.reloadNTimes = reloadNTimes;
window.updateNTimes = updateNTimes;
