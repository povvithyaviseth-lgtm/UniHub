import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAnnouncementsStore } from '../store/announcements.js';

import {
  containerStyle,
  sidebarStyle,
  sidebarInnerStyle,
  welcomeTitleStyle,
  sidebarSubtitleStyle,
  navigationLabelStyle,
  eventsLabelStyle,
  navButtonContainerStyle,
  navButtonBgStyle,
  navButtonTextStyle,
  backToWebsiteStyle,
  dividerContainerStyle,
  dividerLineStyle,
  mainTitleStyle,
  pageTitleStyle,
  createButtonContainerStyle,
  createButtonBgStyle,
  createButtonTextStyle,
  contentContainerStyle,
  announcementCardWrapperStyle,
  announcementCardInnerStyle,
  announcementContentStyle,
  announcementTitleStyle,
  announcementClubNameStyle,
  announcementDescriptionStyle,
  editButtonContainerStyle,
  editButtonBgStyle,
  editButtonTextStyle,
  buttonStyle,
} from '../Style/AnnouncementsStyle.jsx';

const ManageClubAnnouncements = () => {
  const { announcements, loading, error } = useAnnouncementsStore();

  const handleCreateAnnouncement = () => {
    alert('Create New Announcement clicked — coming soon!');
  };

  const handleEditPost = (id) => {
    alert(`Edit post ${id} clicked — coming soon!`);
  };

  const handleManageClub = () => {
    window.location.href = '/manage-club';
  };

  const handleEvents = () => {
    window.location.href = '/events';
  };

  const handleBackToWebsite = () => {
    window.location.href = '/';
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={sidebarInnerStyle}>
          <p style={sidebarSubtitleStyle}>Manage your club</p>
          <p style={navigationLabelStyle}>Navigation</p>
          <p style={eventsLabelStyle}>Events and Notification</p>

          {/* Manage Club Button */}
          <div style={navButtonContainerStyle('156px')}>
            <div style={navButtonBgStyle(false)} />
            <button
              onClick={handleManageClub}
              style={{ ...buttonStyle, ...navButtonTextStyle('14px') }}
            >
              <p style={{ lineHeight: 'normal' }}>{`Manage Club >`}</p>
            </button>
          </div>

          {/* Announcements Button */}
          <div style={navButtonContainerStyle('280px')}>
            <div style={navButtonBgStyle(true)} />
            <button
              onClick={() => {}}
              style={{ ...buttonStyle, ...navButtonTextStyle('14px') }}
            >
              <p style={{ lineHeight: 'normal' }}>{`Announcements >`}</p>
            </button>
          </div>

          {/* Events Button */}
          <div style={navButtonContainerStyle('334px')}>
            <div style={navButtonBgStyle(false)} />
            <button
              onClick={handleEvents}
              style={{ ...buttonStyle, ...navButtonTextStyle('24px') }}
            >
              <p style={{ lineHeight: 'normal' }}>{`Events >`}</p>
            </button>
          </div>

          {/* Back to Website */}
          <button onClick={handleBackToWebsite} style={{ ...buttonStyle, ...backToWebsiteStyle }}>
            <p style={{ lineHeight: 'normal' }}>{`< Back to Website`}</p>
          </button>
        </div>

        {/* Welcome Title */}
        <p style={welcomeTitleStyle}>Welcome</p>
      </div>

      {/* Main Title */}
      <p style={mainTitleStyle}>Club Management Console</p>

      {/* Dividers */}
      <div style={dividerContainerStyle('117px')}>
        <div>
          <div style={dividerLineStyle} />
        </div>
      </div>

      <div style={dividerContainerStyle('249px')}>
        <div>
          <div style={dividerLineStyle} />
        </div>
      </div>

      {/* Page Title */}
      <p style={pageTitleStyle}>Announcements</p>

      {/* Create Button */}
      <div style={createButtonContainerStyle}>
        <div style={createButtonBgStyle} />
        <button
          onClick={handleCreateAnnouncement}
          style={{ ...buttonStyle, ...createButtonTextStyle }}
        >
          <p style={{ lineHeight: 'normal' }}>Create New Announcement</p>
        </button>
      </div>

      {/* Content Container */}
      <div style={contentContainerStyle}>
        {announcements.map((announcement) => (
          <div key={announcement.id} style={announcementCardWrapperStyle}>
            <div style={announcementCardInnerStyle}>
              <div style={announcementContentStyle}>
                <p style={announcementTitleStyle}>{announcement.title}</p>
                <p style={announcementClubNameStyle}>{announcement.clubName}</p>
                <p style={announcementDescriptionStyle}>{announcement.description}</p>

                {/* Edit Button */}
                <div style={editButtonContainerStyle}>
                  <div style={editButtonBgStyle} />
                  <button
                    onClick={() => handleEditPost(announcement.id)}
                    style={{ ...buttonStyle, ...editButtonTextStyle }}
                  >
                    <p style={{ lineHeight: 'normal' }}>Edit Post</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClubAnnouncements;
