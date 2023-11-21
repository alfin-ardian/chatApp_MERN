import React from "react";
import { Input, Button } from "antd";

function App() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "var(--White, #ffffff)",
    color: "var(--Black, #000)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    overflow: "hidden",
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };

  return (
    <>
      <div className="md:flex mx-auto">
        <div className="hidden md:block md:w-1/4"></div>
        <div className="sm:w-full md:w-1/2">
          <div className="p-4">
            <div style={containerStyle}>
              Join Chatroom
              <Input
                className="mb-4 mt-10"
                placeholder="Username"
                allowClear
                onChange={onChange}
              />
              <Input placeholder="Room ID" allowClear onChange={onChange} />
              <Button
                className="mt-4"
                style={{
                  width: "100%",
                  borderRadius: "100px",
                  background: "var(--green-primary, #5DB075)",
                  color: "white",
                }}
              >
                JOIN
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-1/4"></div>
      </div>
    </>
  );
}

export default App;
