import { useEffect } from 'react';
import { resumeContent } from '@/app/data/resume-data';

interface TitleBlockProps {
  className: string;
  line1: string;
  line2: string;
  align?: 'left' | 'right' | 'center';
  details?: string[];
}

function joinItems(items: string[], limit = 6) {
  return items.slice(0, limit).join(' • ');
}

function toUpper(value: string) {
  return value.toUpperCase();
}

function formatExperienceLine(
  role: string,
  company: string,
  period: string,
) {
  return `${role} — ${company} (${period})`;
}

function TitleBlock({
  className,
  line1,
  line2,
  align = 'center',
  details = [],
}: TitleBlockProps) {
  const alignClass =
    align === 'left' ? 'text--left' : align === 'right' ? 'text--right' : 'text--center';

  return (
    <div className={className}>
      <h1 className={`text--white text--noMargin ${alignClass}`}>{line1}</h1>
      <h1 className={`text--white text--noMargin ${alignClass}`}>{line2}</h1>
      {details.length > 0 ? (
        <div className={`resume-overlay ${alignClass}`}>
          {details.map((detail, index) => (
            <p key={`${index}-${detail}`} className="text--white resume-overlay__line">
              {detail}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent,
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

export default function ResumePresentationApp() {
  const content = resumeContent.ru;
  const frontend = content.skills.groups.find((group) => group.title === 'Frontend');
  const backend = content.skills.groups.find((group) => group.title === 'Backend');
  const practices = content.skills.groups.find(
    (group) => group.title === 'Инженерные практики',
  );
  const tools = content.skills.groups.find((group) => group.title === 'Инструменты');

  const experience = content.experience.items;

  const educationLines = content.education.items.map(
    (item) => `${item.degree} — ${item.institution} (${item.period})`,
  );

  const interestLine = joinItems(content.interests.items, 3);
  const languageLine = joinItems(content.languages.items, 4);

  useEffect(() => {
    const styleId = 'vaalentin-presentation-style';
    const scriptId = 'vaalentin-presentation-bundle';

    if (!document.getElementById(styleId)) {
      const mode = supportsWebGL() && !isMobileDevice() ? '3d' : '2d';

      const stylesheet = document.createElement('link');
      stylesheet.id = styleId;
      stylesheet.rel = 'stylesheet';
      stylesheet.type = 'text/css';
      stylesheet.href = `/presentation-runtime/${mode}/main.css`;
      document.head.appendChild(stylesheet);

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = false;
      script.defer = false;
      script.src = `/presentation-runtime/${mode}/bundle.js`;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <div className="loader">
        <h3 className="text--center text--white loader__title is-active">LOADING</h3>
        <div className="loader__progress" />
      </div>

      <div className="help">
        <div className="help__quit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20">
            <line
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="5.8"
              y1="16.7"
              x2="19.2"
              y2="3.3"
            />
            <line
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              x1="5.8"
              y1="3.3"
              x2="19.2"
              y2="16.7"
            />
          </svg>
        </div>

        <div className="slider">
          <div className="slider__slides">
            <div className="slider__slide">
              <div className="slider__slide__content">
                <p className="text--center text--white">
                  Здесь только презентация резюме. Скролл или клавиши вверх/вниз для
                  перехода между сценами.
                </p>
              </div>
            </div>
          </div>
          <div className="slider__map" />
        </div>
      </div>

      <div id="mobile-body">
        <div className="heads">
          <div className="menu">
            <div className="menu__button">
              <div className="menu__button__line menu__button__line--top" />
              <div className="menu__button__line menu__button__line--middle" />
              <div className="menu__button__line menu__button__line--bottom" />
            </div>
            <div className="menu__items">
              <a className="menu__item menu__items--3D" data-button="sounds">
                MUTE
              </a>
              <a className="menu__item menu__items--3D" data-button="help">
                HELP
              </a>
              <a
                className="menu__item"
                href={`mailto:${content.contact.items[0]?.value ?? 'yosinnurov2007@gmail.com'}`}
              >
                CONTACT
              </a>
              <a className="menu__item menu__items--3D" data-button="quality">
                QUALITY 0.5
              </a>
            </div>
          </div>

          <div className="heads__viewport">
            <div className="trigger__info trigger__info--arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 20">
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.5,5L12.5 15 22.5 5"
                />
              </svg>
            </div>
            <div className="trigger__info trigger__info--heads">
              <p className="trigger__info__text">SCROLL TO NEXT SCENE</p>
              <div className="trigger__info__bg trigger__info__bg--heads" />
            </div>
            <div className="trigger__info trigger__info--tails">
              <p className="trigger__info__text">RESUME SUMMARY</p>
              <div className="trigger__info__bg trigger__info__bg--tails" />
            </div>
          </div>

          <div className="heads__sections">
            <div className="heads__section heads__section--hello">
              <TitleBlock
                className="part part--title hello__title"
                line1={toUpper(content.hero.name.split(' ')[0] ?? content.hero.name)}
                line2={toUpper(content.hero.name.split(' ').slice(1).join(' ') || 'RESUME')}
                details={[content.hero.role, content.hero.location]}
              />
              <div
                className="part part--smoke"
                data-0="transform:translate3d(0px, 0px, 0px)"
                data-800="transform:translate3d(0px, -380px, 0px)"
              />
            </div>

            <div className="heads__section heads__section--beams">
              <div
                className="part part--beam--left"
                data-100="transform:translate3d(0px, 170px, 0px); opacity:0"
                data-500="opacity:0.2"
                data-1500="transform:translate3d(-25px, -8px, 0px)"
              />
              <div
                className="part part--beam--center"
                data-0="transform:translate3d(0px, -60px, 0px); opacity:0"
                data-600="opacity:0.9"
                data-1600="transform:translate3d(0px, 28px, 0px)"
              />
              <div
                className="part part--beam--right"
                data-100="transform:translate3d(0px, 90px, 0px); opacity:0"
                data-600="opacity:0.45"
                data-1700="transform:translate3d(0px, -85px, 0px)"
              />
            </div>

            <div className="heads__section heads__section--drop">
              <TitleBlock
                className="part part--title drop__title"
                line1="MIDDLE"
                line2="FRONT-END DEVELOPER"
                align="right"
                details={[content.hero.summary, ...content.about.paragraphs]}
              />
              <div
                className="part part--drop"
                data-1000="transform:translate3d(0px, 420px, 0px); opacity:0"
                data-1700="transform:translate3d(0px, 10px, 0px); opacity:1"
              />
            </div>

            <div className="heads__section heads__section--ball">
              <TitleBlock
                className="part part--title ball__title"
                line1={toUpper(content.hero.stats[0]?.value ?? '2+ YEARS')}
                line2={toUpper(content.hero.stats[1]?.value ?? 'REACT + TS')}
                align="left"
                details={[
                  content.hero.stats[0]?.label ?? '',
                  content.hero.stats[1]?.label ?? '',
                  `${content.hero.stats[2]?.value ?? ''} — ${content.hero.stats[2]?.label ?? ''}`,
                ]}
              />
              <div
                className="part part--sphere"
                data-1400="transform:translate3d(0px, -380px, 0px) rotate(-40deg); opacity:0"
                data-2800="transform:translate3d(0px, 220px, 0px) rotate(35deg); opacity:1"
              />
              <div
                className="part part--grid"
                data-1500="transform:translate3d(0px, 360px, 0px); opacity:0"
                data-2600="transform:translate3d(0px, -140px, 0px); opacity:1"
              />
            </div>

            <div className="heads__section heads__section--flow">
              <div
                className="part part--field"
                data-2000="transform:translate3d(0px, 260px, 0px); opacity:0"
                data-2700="transform:translate3d(0px, -20px, 0px); opacity:1"
              />
              <div
                className="part part--neons"
                data-2200="opacity:0"
                data-3000="opacity:0.82"
                data-3500="opacity:0.18"
              />
              <div
                className="part part--smoke flow__smoke"
                data-2200="transform:translate3d(0px, 460px, 0px); opacity:0"
                data-3200="transform:translate3d(0px, -40px, 0px); opacity:0.9"
              />
              <TitleBlock
                className="part part--title flow__title"
                line1="FRONTEND + BACKEND"
                line2="STACK"
                details={[
                  `Frontend: ${joinItems(frontend?.items ?? [], 8)}`,
                  `Backend: ${joinItems(backend?.items ?? [], 6)}`,
                ]}
              />
            </div>

            <div className="heads__section heads__section--height">
              <TitleBlock
                className="part part--title height__title"
                line1="ENGINEERING"
                line2="PRACTICE"
                align="right"
                details={[
                  `Практики: ${joinItems(practices?.items ?? [], 5)}`,
                  `Инструменты: ${joinItems(tools?.items ?? [], 5)}`,
                ]}
              />
              <div
                className="part part--height"
                data-3000="transform:translate3d(0px, 260px, 0px); opacity:0"
                data-4000="transform:translate3d(0px, -20px, 0px); opacity:0.38"
              />
            </div>

            <div className="heads__section heads__section--face">
              <TitleBlock
                className="part part--title face__title"
                line1="WORK"
                line2="EXPERIENCE"
                align="left"
                details={[
                  formatExperienceLine(
                    experience[0]?.role ?? '',
                    experience[0]?.company ?? '',
                    experience[0]?.period ?? '',
                  ),
                  ...(experience[0]?.bullets ?? []),
                ]}
              />
              <div
                className="part part--face"
                data-4000="transform:translate3d(0px, 240px, 0px); opacity:0"
                data-5500="transform:translate3d(0px, -25px, 0px); opacity:1"
              />
            </div>

            <div className="heads__section heads__section--rocks">
              <TitleBlock
                className="part part--title rocks__title"
                line1="PRODUCT"
                line2="DELIVERY"
                details={[
                  formatExperienceLine(
                    experience[1]?.role ?? '',
                    experience[1]?.company ?? '',
                    experience[1]?.period ?? '',
                  ),
                  ...(experience[1]?.bullets ?? []),
                ]}
              />
              <div
                className="part part--rocks"
                data-5000="transform:translate3d(0px, 240px, 0px);"
                data-6000="transform:translate3d(0px, 70px, 0px);"
              />
            </div>

            <div className="heads__section heads__section--galaxy">
              <TitleBlock
                className="part part--title galaxy__title"
                line1="MENTORING"
                line2="TEACHING"
                details={[
                  formatExperienceLine(
                    experience[2]?.role ?? '',
                    experience[2]?.company ?? '',
                    experience[2]?.period ?? '',
                  ),
                  ...(experience[2]?.bullets ?? []),
                  formatExperienceLine(
                    experience[3]?.role ?? '',
                    experience[3]?.company ?? '',
                    experience[3]?.period ?? '',
                  ),
                  ...(experience[3]?.bullets ?? []),
                ]}
              />
              <div
                className="part part--galaxy"
                data-5800="transform:translate3d(0px, -160px, 0px); opacity:0"
                data-6800="transform:translate3d(0px, 30px, 0px); opacity:1"
              />
            </div>

            <div className="heads__section heads__section--gravity">
              <div
                className="part part--gravity"
                data-6200="transform:translate3d(0px, 260px, 0px); opacity:0"
                data-6800="transform:translate3d(0px, -20px, 0px); opacity:0.9"
              />
              <TitleBlock
                className="part part--title gravity__title"
                line1="EDUCATION"
                line2="AND LANGUAGES"
                details={[...educationLines, `Языки: ${languageLine}`, `Интересы: ${interestLine}`]}
              />
            </div>

            <div className="heads__section heads__section--end">
              <TitleBlock
                className="part part--title end__title"
                line1="CONTACT"
                line2="LET'S BUILD"
                details={[
                  content.contact.description,
                  ...content.contact.items.map((item) => `${item.label}: ${item.value}`),
                ]}
              />
            </div>

            <div className="part part--stars" />
          </div>
        </div>

        <div className="tails">
          <div className="tails__section tails__section--about">
            <h1 className="tails__section__el">RESUME SUMMARY</h1>
            <div className="tails__section__el">
              <p>
                Вся основная информация по резюме встроена прямо в анимированную
                презентацию выше.
              </p>
            </div>
          </div>
        </div>

        <div className="trigger" />
      </div>
    </>
  );
}
