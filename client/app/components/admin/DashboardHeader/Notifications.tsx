import {
  useGetAllNotificationsQuery,
  useUpdateNotificationsMutation,
} from "@/redux/features/notifications/notificationApi";
import { styles } from "../../../styles/style";
import { Badge, Paper, Typography } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";
import { socketId } from "@/app/utils/socket";
import useMutation from "@/app/_hooks/useMutation";

type NotificationsProps = {};

const Notifications: FC<NotificationsProps> = (props) => {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [audio, setAudio] = useState<any>(
    new Audio(
      "https://res.cloudinary.com/dv5idxfb9/video/upload/v1717277830/notification-9-158194_vedanz.mp3"
    )
  );

  //? APi - Get All Notifications
  const { data, refetch } = useGetAllNotificationsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  //? Api - Update nptification status

  const { actionApi: updateNotificationStatus } = useMutation({
    api: useUpdateNotificationsMutation,
    successMsg: false,
    successFunc:()=>{
      refetch()
    }
  });

  const TotalUnreadNotifications = data?.notifications?.filter(
    (item: any) => item.status === "unread"
  )?.length;

  //* Handle to Update Notification Status

  const handleUpdateNotifications = async (id: any) => {
    await updateNotificationStatus(id);
  };
  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data?.notifications?.filter((item: any) => item.status === "unread")
      );
    }

    audio.load();
  }, [data, audio]);

  useEffect(() => {
    socketId.on("newNotifications", (data) => {
      refetch();
      playNotificationSound();
    });
  }, []);

  //! Effect to Hide Notification Box on Outside click
  useEffect(() => {
    const hideOnClickOutside = (e: any) => {
      if (
        notificationsRef.current &&
        !notificationsRef?.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", hideOnClickOutside);
    return () => {
      document.removeEventListener("click", hideOnClickOutside);
    };
  }, []);

  return (
    <div ref={notificationsRef}>
      <Badge
        badgeContent={TotalUnreadNotifications}
        color="primary"
        className="cursor-pointer mr-2 md:mr-5 text-[5px] select-none"
        id="notifyIcon"
        max={9}
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl -mr-1" />
        {/* <span className='absolute -top-1 right-0 bg-[--t-blue] rounded-full w-[16px] h-[16px] text-[10px] flex items-center justify-center'>5</span> */}
      </Badge>
      {open && (
        <Paper className="customScrollBar z-10 dark:text-white text-black w-[280px] h-[50vh] bg-white border-[1px] dark:border-gray-600 rounded-sm dark:bg-[#111C43] absolute bg-[--t-blue] top-12 right-6 pt-2  overflow-y-scroll">
          <Typography
            component={"h4"}
            fontSize={18}
            textAlign={"center"}
            className={`${styles.borderBottom}`}
          >
            Notifications
          </Typography>
          <div className="w-full">
            {notifications && notifications?.length > 0 ?
              notifications?.map((notification: any) => {
                return (
                  <>
                    <NotifyBox notification={notification} handleUpdateNotifications={handleUpdateNotifications} />
                  </>
                );
              }) : <p className="text-center mt-1 text-[12px]">No new notification</p>}
          </div>
        </Paper>
      )}
    </div>
  );
};

const NotifyBox = ({ notification, handleUpdateNotifications }: any) => {
  return (
    <>
      <div
        className={`notify p-2 ${styles.borderBottom} opacity-60 cursor-pointer`}
      >
        <div className="flex justify-between text-[14px] gap-1">
          <span className="">{notification?.title} </span>
          <span className="">
            <b
              className="mr-1"
              onClick={() => handleUpdateNotifications(notification?._id)}
            >
              (Mark as Read)
            </b>{" "}
          </span>
        </div>
        <Typography className="notifyMsg" fontSize={12}>
          {notification?.message}
          {/* Hi, I want to buy a course from your side so please update me about how can i know about more about your features. */}
        </Typography>
        <small>            {format(notification.createdAt)}
</small>
      </div>
    </>
  );
};

export default Notifications;
