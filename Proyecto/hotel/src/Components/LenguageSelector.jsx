import React from 'react';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleMenuClick = (e) => {
    i18n.changeLanguage(e.key);
  };

  const items = [
    {
      key: 'es',
      label: 'Español',
      icon: <span role="img" aria-label="Español">🇪🇸</span>,
    },
    {
      key: 'en',
      label: 'English',
      icon: <span role="img" aria-label="English">🇬🇧</span>,
    },
    // Add more languages here if needed
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
        selectable: true,
        defaultSelectedKeys: [i18n.language],
        selectedKeys: [i18n.language],
      }}
      placement="bottomRight"
    >
     <a
        onClick={e => e.preventDefault()}
        style={{
          marginLeft: '1rem',
          padding: '0.3rem',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'inherit', // Inherit text color from parent
          textDecoration: 'none' // Optional: remove underline
        }}
      >
        <Space>
          <GlobalOutlined />
          {i18n.language === 'es' ? 'Español' : 'English'}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LanguageSelector;