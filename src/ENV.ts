const startTime = Number(process.env.START_TIME);
if (isNaN(startTime))
  throw new Error("Error Initializing Constants: startTime" + startTime);

export { startTime };
