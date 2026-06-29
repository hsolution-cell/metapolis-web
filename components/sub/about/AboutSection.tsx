import SubSectionHead from "@/components/sub/SubSectionHead";
import AboutWayVisual from "@/components/sub/about/AboutWayVisual";

export default function AboutSection() {
  return (
    <div className="about innerBot innerTop">
      <section className="about_intro" aria-labelledby="about-intro-title">
        <div className="content_inner">
          <SubSectionHead
            className="sub_section_head--spaced"
            eyebrow="Mall Introduction"
            title={<b>METAPOLIS</b>}
            titleId="about-intro-title"
          />
          <div className="about_lead">
            <p>
              메타폴리스는 당신의 일상에 새로운 감각을 불어넣고, 평범한 하루를
              특별한 장면으로 바꿔놓습니다.
            </p>
            <p>
              자연이 머무는 테라스에서 새롭게 마주하는 여유. <br />
              소중한 사람과 즐겁게 쌓아가는 오늘의 시간, 세심하게 설계된 공간이
              선사하는 편안한 머무름. <br />
              쇼핑·다이닝·컬처가 자연스럽게 어우러지는 동탄 프리미엄
              라이프스타일의 중심, 메타폴리스.
            </p>
            <p>
              일상을 산책하듯 머무는 이곳에서, 기분 좋은 힐링으로 특별한 하루를
              맞이해 보세요
            </p>
          </div>
          <div className="about-line"></div>
        </div>
      </section>

      <section className="about_ways" aria-labelledby="about-ways-title">
        <div className="content_inner">
          <SubSectionHead
            className="about_ways_head"
            eyebrow="Three Ways to Stay"
            title={
              <>
                일상이 특별해지는 <strong>세 가지 방식</strong>
              </>
            }
            titleId="about-ways-title"
          />

          <div className="about_ways_list">
            <article className="about_way">
              <div className="about_way_text">
                <p className="about_way_num">
                  <span></span>01 천천히
                </p>
                <h3 className="about_way_title">Strolling</h3>
                <p className="about_way_desc">
                  산책하듯 거닐며 발견하는 일상의 여유. 자연이 머무는 테라스와
                  열린 공간에서 느리게, 그리고 깊게 숨을 고르세요.
                </p>
              </div>
              <AboutWayVisual
                shape="rect"
                src="/img/sub/about/strolling.png"
                alt="햇살이 비치는 산책로와 벤치"
                deco="METAPOLIS STROLLING"
              />
            </article>

            <article className="about_way about_way--reverse">
              <div className="about_way_text">
                <p className="about_way_num">
                  <span></span>02 함께
                </p>
                <h3 className="about_way_title">Dining</h3>
                <p className="about_way_desc">
                  소중한 사람과 추억을 쌓아가는 시간. 쇼핑과 다이닝, 즐길 거리가
                  어우러지는 곳에서 평범한 하루가 특별한 기억이 됩니다.
                </p>
              </div>
              <AboutWayVisual
                shape="circle"
                src="/img/sub/about/dining.png"
                alt="셰프가 요리를 플레이팅하는 모습"
                deco="METAPOLIS DINING"
              />
            </article>

            <article className="about_way">
              <div className="about_way_text">
                <p className="about_way_num">
                  <span></span>03 편하게
                </p>
                <h3 className="about_way_title">Living</h3>
                <p className="about_way_desc">
                  세심하게 설계된 공간이 선사하는 편안한 머무름. 동탄 프리미엄
                  라이프스타일의 중심, 메타폴리스에서 일상을 설계해 보세요.
                </p>
              </div>
              <AboutWayVisual
                shape="rect"
                src="/img/sub/about/living.png"
                alt="모던한 라운지 인테리어"
                deco="METAPOLIS LIVING"
                decoClassName="about_way_deco--living"
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
