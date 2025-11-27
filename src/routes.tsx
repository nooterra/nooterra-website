import React from "react";
import { Routes, Route } from "react-router-dom";
import ConsoleLayout from "./views/ConsoleLayout";
import Agents from "./views/Agents";
import AgentDetail from "./views/AgentDetail";
import Tasks from "./views/Tasks";
import Credits from "./views/Credits";
import Workflows from "./views/Workflows";
import WorkflowDetail from "./views/WorkflowDetail";
import Explore from "./views/Explore";
import Home from "./views/Home";
import { Navigate } from "react-router-dom";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/console" element={<ConsoleLayout />}>
      <Route index element={<Navigate to="/console/agents" replace />} />
      <Route path="agents" element={<Agents />} />
      <Route path="agents/:did" element={<AgentDetail />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="workflows" element={<Workflows />} />
      <Route path="workflows/:id" element={<WorkflowDetail />} />
      <Route path="credits" element={<Credits />} />
    </Route>
  </Routes>
);
