import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetMessages, usePostMessage } from "./hooks/api/messages";
import "./chat.css";

const UpArrowButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <div
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: "#5DB075",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ArrowUpOutlined
        style={{
          fontSize: 16,
          color: "#fff",
        }}
      />
    </div>
  </div>
);

const ChatMessage: React.FC<{
  user: any;
  msg: string;
  selfId: string;
}> = ({ user, msg, selfId }) => {
  const isSelfMessage = user === selfId;

  return (
    <div
      style={{
        marginBottom: "10px",
        width: "60%",
        textAlign: isSelfMessage ? "right" : "left",
        marginLeft: isSelfMessage ? "auto" : "0",
      }}
    >
      <div
        style={{
          padding: 6,
          marginLeft: "10px",
        }}
      >
        {user}
      </div>
      <div
        style={{
          backgroundColor: !isSelfMessage ? "#E8E8E8" : "#5DB075",
          padding: "10px",
          marginLeft: "10px",
          borderRadius: "10px",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: !isSelfMessage ? "0" : "10px",
          borderBottomRightRadius: !isSelfMessage ? "10px" : "0",
          color: isSelfMessage ? "#fff" : "#000",
          position: "relative",
        }}
        className={`message ${
          isSelfMessage ? "my-message" : "other-message"
        } ls-msg wordwrap`}
      >
        {msg}
      </div>
    </div>
  );
};

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const dataLocalStorage = localStorage.getItem("userData");
  const parsedData = dataLocalStorage ? JSON.parse(dataLocalStorage) : null;

  const [stateData, setStateData] = useState<any>({
    username: parsedData ? parsedData.username : "",
    roomId: parsedData ? parsedData.roomId : "",
    message: "",
  });
  const { data, refetch } = useGetMessages();

  const selfId = stateData.username;

  const sendMessage = () => {
    usePostMessage(stateData).then((res: any) => {
      console.log(res);
      setStateData({ ...stateData, message: "" });
      refetch();
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const chat = document.getElementById("chat");
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="md:flex mx-auto">
      <div className="hidden md:block md:w-1/4"></div>
      <div className="sm:w-full md:w-1/2 flex flex-col h-screen">
        <div
          className="flex justify-between items-center w-full"
          style={{ height: "70px" }}
        >
          <h1
            style={{
              color: "#5DB075",
              fontWeight: "500",
              fontSize: "16px",
              cursor: "pointer",
              margin: 4,
            }}
            onClick={() => navigate("/")}
          >
            Exit
          </h1>
          <h1 style={{ margin: "0 auto", fontWeight: "600", fontSize: "30px" }}>
            {parsedData?.roomId}
          </h1>
        </div>
        <div
          id="chat"
          style={{
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column-reverse",
            maxHeight: "calc(100vh - 150px)",
            marginBottom: "5px",
          }}
        >
          <ul className="m-b-0">
            {data &&
              data.map((message: any, index: number) => (
                <ChatMessage
                  key={index}
                  user={message.username}
                  msg={message.message}
                  selfId={selfId}
                />
              ))}
          </ul>
        </div>
        <Input
          placeholder="Message here..."
          className="p-4"
          suffix={<UpArrowButton onClick={sendMessage} />}
          style={{
            borderRadius: "100px",
            height: "10%",
          }}
          onChange={(e) =>
            setStateData({ ...stateData, message: e.target.value })
          }
          onKeyPress={handleKeyPress}
          value={stateData.message}
          size="large"
        />
      </div>
      <div className="hidden md:block md:w-1/4"></div>
    </div>
  );
};

export default Chat;
