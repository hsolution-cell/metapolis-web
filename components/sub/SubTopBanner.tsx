import type { SubPageContext } from "@/lib/subPageContext";
import SubBreadcrumb from "@/components/sub/SubBreadcrumb";

export default function SubTopBanner({ config, group, siblings, currentPath }: SubPageContext) {
  return (
    <section className="sub-top-banner" aria-labelledby="sub-banner-title">
      <div className="sub-top-banner-media" aria-hidden="true">
        <div className="sub-top-banner-bg-wrap">
          <div
            className="sub-top-banner-bg"
            style={{ backgroundImage: `url(${config.bannerImage})` }}
          />
        </div>
      </div>
      <div className="sub-top-banner-overlay" aria-hidden="true" />
      <div className="sub-top-banner-inner content_inner">
        <SubBreadcrumb
          groupLabel={group.label}
          siblings={siblings}
          currentPath={currentPath}
          currentLabel={config.label}
        />
        <h1 id="sub-banner-title" className="sub-top-banner-title">
          {config.label}
        </h1>
      </div>
    </section>
  );
}
