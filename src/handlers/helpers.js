exports.version = "1.0.0";

exports.make_error = (err, msg) => {
    let e = new Error(msg);
    e.code = err;
    return e;
};

exports.send_success = (res, data) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    let output = { error: null, data: data };
    res.end(JSON.stringify(output) + "\n");
};

exports.send_failure = (res, server_code, err) => {
    const code = err.code ? err.code : err.name;
    res.writeHead(server_code, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
};

exports.invalid_resource = () =>
    this.make_error(
        "invalid resource",
        "the requested resource does not exist"
    );
