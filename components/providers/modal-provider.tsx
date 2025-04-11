"use client";

import { useEffect, useState } from "react";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "../modals/invite-modals";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <CreateChannelModal />
      <CreateServerModal />
      {/* <DeleteChannelModal /> */}
      {/* <DeleteMessageModal /> */}
      <DeleteServerModal />
      {/* <EditChannelModal /> */}
      <EditServerModal />
      <InviteModal />
      {/* <LeaveServerModal /> */}
      <MembersModal />
      {/* <MessageFileModal /> */}
    </>
  );
};
