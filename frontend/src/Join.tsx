import React, { useState } from "react";
import { Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { usePostUser } from "./hooks/api";

type NotificationType = "success" | "info" | "warning" | "error";

const Join: React.FC = () => {
  const navigate = useNavigate();
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "var(--White, #F6F6F6)",
    color: "var(--Black, #000)",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    overflow: "hidden",
  };
  const [stateData, setStateData] = useState<any>();

  const submitData = () => {
    usePostUser(stateData)
      .then((res: any) => {
        console.log(res.data, "res");
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate(`/chat`);
      })
      .catch((error) => {
        console.log(error, "error");
        openNotificationWithIcon("error", error.error);
      });
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    errorMessage: string
  ) => {
    notification[type]({
      message: "Registration Failed",
      description: errorMessage,
    });
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
                size="large"
                allowClear
                onChange={(e) =>
                  setStateData({ ...stateData, username: e.target.value })
                }
              />
              <Input
                placeholder="Room ID"
                size="large"
                allowClear
                onChange={(e) =>
                  setStateData({ ...stateData, roomId: e.target.value })
                }
              />
              <Button
                className="mt-4"
                style={{
                  width: "100%",
                  borderRadius: "100px",
                  background: "var(--green-primary, #5DB075)",
                  color: "white",
                }}
                size="large"
                onClick={() => submitData()}
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
};

export default Join;
