export const syncErrorHandle = (err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.json({ error: "error occurred" });
  } else {
    next();
  }
};

export const routeErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (err.type == "handler") {
    return res.json({
      message: "sorry something not right with you provided info",
    });
  } else if (err.type == "input") {
    return res.json({
      message: "sorry something not right with you provided input",
    });
  } else if (err.type == "code") {
    return res.json({ message: "sorry there is error in our system" });
  }
};
