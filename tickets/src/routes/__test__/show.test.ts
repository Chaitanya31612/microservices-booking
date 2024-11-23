import request from "supertest";
import { app } from "../../app";

it("returns 404 if ticket is not found", async () => {
  await request(app).get("/api/tickets/sadfl").send().expect(404);
});

it("returns the ticket if ticket is found", async () => {});
