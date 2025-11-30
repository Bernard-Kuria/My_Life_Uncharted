"use client";

import Notification from "@components/Notification";
import SectionTitle from "@components/SectionTitle";

import useSubscription from "@hooks/useSubscription";

export default function Subscription() {
  const {
    topics,
    checkedTopics,
    handleConnect,
    connecting,
    connectEmail,
    setConnectEmail,
    disconnecting,
    disconnectEmail,
    setDisconnectEmail,
    handleCheckboxChange,
    handleDisconnect,
    notification,
    setNotification,
    notificationStatus,
  } = useSubscription();

  return (
    <div className="relative flex flex-col justify-center items-center gap-10 page-layout">
      <form
        className="flex flex-col gap-5 w-full md:w-[500px]"
        onSubmit={handleConnect}
      >
        <SectionTitle title="Stay in touch" />

        <div className="border border-(--secondary-blue) rounded-[10px] p-2 md:p-5 grid gap-5">
          <div className="grid gap-5">
            {`Get connected so you don't miss a content on the topics you love.`}

            <div>
              <div>Your email:</div>
              <input
                type="email"
                value={connectEmail}
                placeholder="example@test.com"
                required
                className="border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
                onChange={(e) => setConnectEmail(e.target.value)}
              />
            </div>

            <div>
              <div>I want to receive notifications on topics:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {topics.map((topicObj) => {
                  const checkboxId = `checkbox-${topicObj.title.replace(
                    /\s/g,
                    "-"
                  )}`;
                  const topic = topicObj.title;

                  return (
                    <label
                      key={topic}
                      htmlFor={checkboxId}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="relative flex items-center">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={checkedTopics[topic] ?? false}
                          onChange={() => handleCheckboxChange(topic)}
                          className="appearance-none h-5 w-5 border-2 border-(--secondary-blue) rounded-full focus:outline-none peer"
                        />
                        <div className="absolute left-1 h-3 w-3 rounded-full bg-(--primary-blue) dark:bg-(--secondary-blue)/50 opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      {topic}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <button type="submit" className="button">
            {connecting ? "Connecting" : "Connect"}
          </button>
        </div>
      </form>

      <form
        className="border border-(--secondary-blue) flex flex-col p-2 md:p-5 gap-5 w-full md:w-[500px] rounded-2xl"
        onSubmit={handleDisconnect}
      >
        You can also disconnect anytime ;)
        <div>
          <div>Your email:</div>
          <input
            type="email"
            placeholder="example@test.com"
            value={disconnectEmail}
            className="border border-(--secondary-blue) w-full rounded-[10px] px-4 py-2 text-foreground"
            onChange={(e) => setDisconnectEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          {disconnecting ? "Disconnecting" : "Disconnect"}
        </button>
      </form>

      <Notification
        notification={notification}
        setNotification={setNotification}
        status={notificationStatus}
      />
    </div>
  );
}
