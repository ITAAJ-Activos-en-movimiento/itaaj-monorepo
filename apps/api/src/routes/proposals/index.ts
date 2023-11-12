import { RouteOptions } from "fastify";
import { getAllProposalsRoute } from "./list";
import { createProposalRoute } from "./create";

const proposalsRoutes: RouteOptions[] = [
  getAllProposalsRoute,
  createProposalRoute,
];

export default proposalsRoutes;
