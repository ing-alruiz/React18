import React from 'react';
import { Timeline } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './TimelinePage.module.css'; // Import the custom CSS

const TimelinePage = () => {
    const { t } = useTranslation();

    return (
        <div style={{ padding: '20px' }}>
            <h1>{t('Timeline.title')}</h1>
            <Timeline className={styles.customTimeline}>
                <Timeline.Item color="orange">
                    <strong>{t('Timeline.2022_2024.title')}</strong>
                    <ul>
                        {t('Timeline.2022_2024.details', { returnObjects: true }).map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </Timeline.Item>
                <Timeline.Item color="purple">
                    <strong>{t('Timeline.2020_2022.title')}</strong>
                    <ul>
                        {t('Timeline.2020_2022.details', { returnObjects: true }).map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </Timeline.Item>
                <Timeline.Item color="red">
                    <strong>{t('Timeline.2019_2020.title')}</strong>
                    <ul>
                        {t('Timeline.2019_2020.details', { returnObjects: true }).map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </Timeline.Item>
                <Timeline.Item color="blue">
                    <strong>{t('Timeline.2018_2019.title')}</strong>
                    <ul>
                        {t('Timeline.2018_2019.details', { returnObjects: true }).map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </Timeline.Item>
                <Timeline.Item color="green">
                    <strong>{t('Timeline.2017.title')}</strong>
                    <ul>
                        {t('Timeline.2017.details', { returnObjects: true }).map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </Timeline.Item>
            </Timeline>
        </div>
    );
};

export default TimelinePage;