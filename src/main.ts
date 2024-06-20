import fs from "fs";
import * as github from "@actions/github";
import * as core from "@actions/core";
import { CommentClient } from "./lib/index.js";

async function run() {
  try {
    const message = core.getInput("message");
    const filePath = core.getInput("filePath");
    const pr_number = core.getInput("pr_number");
    const comment_tag = core.getInput("comment_tag");
    const reactions = core.getInput("reactions");
    const recreate = core.getBooleanInput("recreate");
    const create_if_not_exists = core.getBooleanInput("create_if_not_exists");

    if (!message && !filePath) {
      core.setFailed('Either "filePath" or "message" should be provided as input');
      return;
    }

    let content: string = message;
    if (!message && filePath) {
      content = fs.readFileSync(filePath, "utf8");
    }

    const context = github.context;
    const issue_number = parseInt(pr_number)
      || context.payload.pull_request?.number
      || context.payload.issue?.number;

    if (!issue_number) {
      core.setFailed("No issue/pull request in input neither in current context.");
      return;
    }

    const api = CommentClient.fromEnv();
    await api.doComment({
      ...context.repo,
      issue_number,
      content,
      comment_tag,
      reactions,
      recreate,
      create_if_not_exists,
    });
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

void run();
