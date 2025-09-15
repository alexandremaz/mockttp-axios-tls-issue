import axios from "axios";
import mockttp from "mockttp";

const mockServer = mockttp.getLocal();

await mockServer.start(8888);

await mockServer.forGet("/mocked-path").thenReply(200, "A mocked response");

const axiosInstance = axios.create({
  baseURL: "https://google.com",
  proxy: {
    host: "localhost",
    port: 8888,
    protocol: "http",
  },
});

try {
  const response = await axiosInstance.get("/mocked-path");

  console.log({
    data: response.data,
  });
} catch (e) {
  console.error(e);
}

await mockServer.stop();
