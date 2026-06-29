import SubSectionHead from "@/components/sub/SubSectionHead";
import LocationKakaoMap from "@/components/sub/location/LocationKakaoMap";
import LocationTransportPanel from "@/components/sub/location/LocationTransportPanel";
import { LOCATION_ADDRESS, LOCATION_PHONE } from "@/data/locationTransport";

export default function LocationSection() {
  return (
    <div className="location">
      <section className="location_hero" aria-labelledby="location-main-title">
        <div className="location_hero_inner innerTop  content_inner">
          <SubSectionHead
            className="location_head"
            eyebrow="Location"
            title={
              <>
                <strong>오시는 길</strong>
              </>
            }
            titleId="location-main-title"
          />

          <ul className="location_contact">
            <li>
              <span className="location_contact_icon" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M15 14.375C14.1712 14.375 13.3763 14.0458 12.7903 13.4597C12.2042 12.8737 11.875 12.0788 11.875 11.25C11.875 10.4212 12.2042 9.62634 12.7903 9.04029C13.3763 8.45424 14.1712 8.125 15 8.125C15.8288 8.125 16.6237 8.45424 17.2097 9.04029C17.7958 9.62634 18.125 10.4212 18.125 11.25C18.125 11.6604 18.0442 12.0667 17.8871 12.4459C17.7301 12.825 17.4999 13.1695 17.2097 13.4597C16.9195 13.7499 16.575 13.9801 16.1959 14.1371C15.8167 14.2942 15.4104 14.375 15 14.375ZM15 2.5C12.6794 2.5 10.4538 3.42187 8.81282 5.06282C7.17187 6.70376 6.25 8.92936 6.25 11.25C6.25 17.8125 15 27.5 15 27.5C15 27.5 23.75 17.8125 23.75 11.25C23.75 8.92936 22.8281 6.70376 21.1872 5.06282C19.5462 3.42187 17.3206 2.5 15 2.5Z"
                    fill="#B89968"
                  />
                </svg>
              </span>
              <span>{LOCATION_ADDRESS}</span>
            </li>
            <li>
              <span className="location_contact_icon" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <path
                    d="M8.41023 2.89603L10.4856 2.27032C11.1705 2.06414 11.9071 2.11417 12.5578 2.41106C13.2086 2.70796 13.7292 3.23145 14.0224 3.88389L15.4774 7.11961C15.7299 7.68095 15.8003 8.30729 15.6786 8.91069C15.557 9.51408 15.2494 10.0642 14.7992 10.4839L12.5845 12.5475C12.2877 12.8292 12.5127 13.9275 13.597 15.8067C14.6824 17.6871 15.5213 18.4307 15.9081 18.315L18.8095 17.4278C19.3976 17.2479 20.0273 17.2566 20.6103 17.4526C21.1932 17.6485 21.7002 18.022 22.0602 18.5207L24.1281 21.3867C24.5458 21.9655 24.7392 22.6762 24.6723 23.3868C24.6055 24.0974 24.2831 24.7596 23.7649 25.2503L22.1663 26.7642C21.6502 27.253 21.0138 27.596 20.3219 27.7585C19.63 27.9209 18.9073 27.8969 18.2277 27.6889C14.8784 26.6635 11.7767 23.6207 8.88058 18.6032C5.97808 13.5782 4.88201 9.33961 5.64594 5.87675C5.80002 5.17898 6.13739 4.53493 6.62329 4.01099C7.10919 3.48705 7.72603 3.10217 8.41023 2.89603Z"
                    fill="#B89968"
                  />
                </svg>
              </span>
              <a href={`tel:${LOCATION_PHONE.replace(/-/g, "")}`}>
                {LOCATION_PHONE}
              </a>
            </li>
          </ul>

          <LocationKakaoMap />
        </div>
      </section>

      <LocationTransportPanel />
    </div>
  );
}
