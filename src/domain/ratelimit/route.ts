/** A request's rate-limit identity: the templated route and its major parameter. */
export interface RouteIdentity {
  /** Method plus path with ids templated, e.g. `PATCH /channels/:major/messages/:id`. */
  route: string;
  /** The major parameter (channel, guild or webhook) that splits buckets, or `"global"`. */
  major: string;
}

const MAJOR_RESOURCES = new Set(["channels", "guilds"]);
const SNOWFLAKE = /^\d{1,20}$/;

/** Derives the rate-limit identity of a request, following Discord's bucket model. */
export function routeOf(method: string, path: string): RouteIdentity {
  const segments = (path.split("?")[0] ?? "").split("/").filter(Boolean);
  const templated: string[] = [];
  let major = "global";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i] ?? "";
    const previous = segments[i - 1];

    if (i === 1 && previous !== undefined && MAJOR_RESOURCES.has(previous) && SNOWFLAKE.test(segment)) {
      major = segment;
      templated.push(":major");
    } else if (i === 1 && previous === "webhooks" && SNOWFLAKE.test(segment)) {
      const token = segments[i + 1];
      major = token === undefined ? segment : `${segment}/${token}`;
      templated.push(":major");
      if (token !== undefined) i++;
    } else if (previous === "interactions" && SNOWFLAKE.test(segment)) {
      templated.push(":id", ":token");
      i++;
    } else if (previous === "reactions") {
      templated.push(":emoji");
    } else {
      templated.push(SNOWFLAKE.test(segment) ? ":id" : segment);
    }
  }

  return { route: `${method.toUpperCase()} /${templated.join("/")}`, major };
}
