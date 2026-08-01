"use client";
import { phoneNumber } from "@/const/data";
import { trackEvent } from "@/lib/analytics";
import React from "react";



export const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "").replace(" ", "")}?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20this.%20Could%20you%20please%20provide%20details?`;

/** Page reference travels in the message body; outbound clicks are untrackable. */
export function whatsappLinkFor(pathname?: string) {
  const ref = pathname && pathname !== "/" ? pathname.replace(/^\//, "") : "home";
  const text = `Hello, I would like to know more about this. Could you please provide details? (ref: ${ref})`;
  return `https://wa.me/${phoneNumber
    .replace("+", "")
    .replace(" ", "")}?text=${encodeURIComponent(text)}`;
}

const WhatsappButton = () => {
  return (
    <>
      <a
        href={whatsappLink}
        onClick={() => trackEvent("whatsapp_click", { link_position: "floating" })}
        className="align-items-center"
        style={{
          display: "flex",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 99999999,
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <button id="btn-message" className="button-message">
          <div className="content-avatar">
            <div className="status-user"></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="avatar flex itemd-center justify-center"
            >
              <svg
                className="whatsapp"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="30"
                width="30"
              >
                <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.908c0 1.748.458 3.45 1.321 4.956L2 22l5.255-1.377a9.916 9.916 0 0 0 4.737 1.206h.005c5.46 0 9.908-4.448 9.913-9.913A9.872 9.872 0 0 0 19 4.908h.001ZM11.992 20.15A8.216 8.216 0 0 1 7.797 19l-.3-.18-3.117.818.833-3.041-.196-.314a8.2 8.2 0 0 1-1.258-4.381c0-4.533 3.696-8.23 8.239-8.23a8.2 8.2 0 0 1 5.825 2.413 8.196 8.196 0 0 1 2.41 5.825c-.006 4.55-3.702 8.24-8.24 8.24Zm4.52-6.167c-.247-.124-1.463-.723-1.692-.808-.228-.08-.394-.123-.556.124-.166.246-.641.808-.784.969-.143.166-.29.185-.537.062-.247-.125-1.045-.385-1.99-1.23-.738-.657-1.232-1.47-1.38-1.716-.142-.247-.013-.38.11-.504.11-.11.247-.29.37-.432.126-.143.167-.248.248-.413.082-.167.043-.31-.018-.433-.063-.124-.557-1.345-.765-1.838-.2-.486-.404-.419-.557-.425-.142-.009-.309-.009-.475-.009a.911.911 0 0 0-.661.31c-.228.247-.864.845-.864 2.067 0 1.22.888 2.395 1.013 2.56.122.167 1.742 2.666 4.229 3.74.587.257 1.05.408 1.41.523.595.19 1.13.162 1.558.1.475-.072 1.464-.6 1.673-1.178.205-.58.205-1.075.142-1.18-.061-.104-.227-.165-.475-.29Z"></path>
              </svg>
            </div>
          </div>
          <div className="notice-content">
            <div className="username">CLT Academy</div>
            <div className="lable-message">Message</div>
            <div className="user-id">@CLTAcademy</div>
          </div>
        </button>
      </a>
      <style jsx>{`
        #btn-message {
          --text-color: rgb(255, 255, 255);
          --bg-color-sup: #5e5e5e;
          --bg-color: #2b2b2b;
          --bg-hover-color: #161616;
          --online-status: #00da00;
          --font-size: 16px;
          --btn-transition: all 0.2s ease-out;
        }

        .button-message {
          display: flex;
          justify-content: center;
          align-items: center;
          font: 400 var(--font-size) Helvetica Neue, sans-serif;
          box-shadow: 0 0 2.17382px rgba(0, 0, 0, 0.049),
            0 1.75px 6.01034px rgba(0, 0, 0, 0.07),
            0 3.63px 14.4706px rgba(0, 0, 0, 0.091),
            0 22px 48px rgba(0, 0, 0, 0.14);
          background-color: var(--bg-color);
          border-radius: 68px;
          cursor: pointer;
          padding: 6px 10px 6px 6px;
          width: fit-content;
          height: 40px;
          border: 0;
          overflow: hidden;
          position: relative;
          transition: var(--btn-transition);
        }

        .button-message:hover {
          height: 56px;
          padding: 8px 20px 8px 8px;
          background-color: var(--bg-hover-color);
          transition: var(--btn-transition);
        }
        .whatsapp {
          fill: #00ff00;
        }

        .button-message:active {
          transform: scale(0.99);
        }

        .content-avatar {
          width: 30px;
          height: 30px;
          margin: 0;
          transition: var(--btn-transition);
          position: relative;
        }

        .button-message:hover .content-avatar {
          width: 40px;
          height: 40px;
        }

        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-color-sup);
        }

        .user-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-user {
          position: absolute;
          width: 6px;
          height: 6px;
          right: 1px;
          bottom: 1px;
          border-radius: 50%;
          outline: solid 2px var(--bg-color);
          background-color: var(--online-status);
          transition: var(--btn-transition);
          animation: active-status 2s ease-in-out infinite;
        }

        .button-message:hover .status-user {
          width: 10px;
          height: 10px;
          right: 1px;
          bottom: 1px;
          outline: solid 3px var(--bg-hover-color);
        }

        .notice-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: 8px;
          text-align: initial;
          color: var(--text-color);
        }

        .username {
          letter-spacing: -6px;
          height: 0;
          opacity: 0;
          transform: translateY(-20px);
          transition: var(--btn-transition);
        }

        .user-id {
          font-size: 12px;
          letter-spacing: -6px;
          height: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: var(--btn-transition);
        }

        .lable-message {
          display: flex;
          align-items: center;
          opacity: 1;
          transform: scaleY(1);
          transition: var(--btn-transition);
        }

        .button-message:hover .username {
          height: auto;
          letter-spacing: normal;
          opacity: 1;
          transform: translateY(0);
          transition: var(--btn-transition);
        }

        .button-message:hover .user-id {
          height: auto;
          letter-spacing: normal;
          opacity: 1;
          transform: translateY(0);
          transition: var(--btn-transition);
        }

        .button-message:hover .lable-message {
          height: 0;
          transform: scaleY(0);
          transition: var(--btn-transition);
        }

        .lable-message,
        .username {
          font-weight: 600;
        }

        .number-message {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-left: 8px;
          font-size: 12px;
          width: 16px;
          height: 16px;
          background-color: var(--bg-color-sup);
          border-radius: 20px;
        }

        /*==============================================*/
        @keyframes active-status {
          0% {
            background-color: var(--online-status);
          }

          33.33% {
            background-color: #93e200;
          }

          66.33% {
            background-color: #93e200;
          }

          100% {
            background-color: var(--online-status);
          }
        }
      `}</style>
    </>
  );
};

export default WhatsappButton;
