<<<<<<< HEAD
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOSDB_ENDPOINT;
const key = process.env.COSMOSDB_KEY;

const client = new CosmosClient({ endpoint, key });

const databaseId = "iiot-telemetry-db";
const containerId = "device-telemetry";

const fetchAlarmsFromCosmos = async (deviceId, plantId) => {
  let baseQuery = "SELECT * FROM c WHERE c.type = 'alarm'";
  const parameters = [];
  if (deviceId && deviceId !== 'all') {
    baseQuery += " AND c.deviceId = @deviceId";
    parameters.push({ name: "@deviceId", value: deviceId });
  }
  if (plantId) {
    baseQuery += " AND c.plantId = @plantId";
    parameters.push({ name: "@plantId", value: plantId });
  }
  baseQuery += " ORDER BY c.timestamp DESC";
  const querySpec = { query: baseQuery, parameters };
  const { resources } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll();
  return resources;
};

// Fetch telemetry data by device name (for /api/telemetry/latest/:deviceId)
const getTelemetryDataByDeviceName = async (deviceName) => {
  let baseQuery = "SELECT TOP 1 * FROM c WHERE c.device = @deviceName ORDER BY c.timestamp DESC";
  const parameters = [{ name: "@deviceName", value: deviceName }];
  const querySpec = { query: baseQuery, parameters };
  const { resources } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll();
  return resources.length > 0 ? resources[0] : null;
};

module.exports = {
  fetchAlarmsFromCosmos,
  getTelemetryDataByDeviceName,
};
=======
const getTelemetryDataByDeviceName = async (deviceName , container) => {
  console.log(`DeviceName: ${deviceName}`);
  console.log(`Container: ${container}`);
  try {
      if (!container) {
          console.error("❌ Container not initialized. Call connectCosmosDB() first.");
          return [];
      }

      // Fetch telemetry data for the given device name
      console.log(`📡 Fetching telemetry data for device: ${deviceName}`);
      const querySpec = {
          query: "SELECT TOP 1 * FROM c WHERE c.device = @deviceName ORDER BY c.timestamp DESC",
          parameters: [{ name: "@deviceName", value: deviceName }]
      };

      const { resources } = await container.items.query(querySpec).fetchAll();
      console.log("REsource is:", resources);
      return resources.length > 0 ? resources[0] : null;
  } catch (error) {
      console.error("❌ Error Fetching Telemetry Data:", error.message);
      return null;
  }
};

module.exports = { getTelemetryDataByDeviceName };
>>>>>>> 4afd72803bc02df8bd9a2bdabbed18b96955b4bb
