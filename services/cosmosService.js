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
          query: "SELECT * FROM c WHERE c.device = @deviceName ORDER BY c.timestamp DESC",
          parameters: [{ name: "@deviceName", value: deviceName }]
      };
      const { resources } = await container.items.query(querySpec).fetchAll();
        console.log("Telemetry Data:", resources[1]);
      return resources.length > 0 ? resources[1] : null;
  } catch (error) {
      console.error("❌ Error Fetching Telemetry Data:", error.message);
      return null;
  }
};

module.exports = { getTelemetryDataByDeviceName };
