import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const menu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage('en')}>
        EN
      </Menu.Item>
      <Menu.Item key="es" onClick={() => changeLanguage('es')}>
        ES
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {i18n.language.toUpperCase()} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;