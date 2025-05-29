import styles from "./Aboute.module.css";

function YourComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.subtitle}>
          Bu yerda sizga bizning fakultetlar haqida qisqacha ma'lumotlar
          berilgan
        </p>

        <div className={styles.grid}>
          <div className={`${styles.gridItem} ${styles.gridItemLarge}`}>
            <div className={styles.innerContent}>
              <p className={styles.itemTitle}>Texnologik rivojlangan</p>
              <p className={styles.itemText}>
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </p>
              <div className={styles.imageContainer}>
                <img
                  src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                  alt="Mobil moslashuvchan"
                />
              </div>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.innerContent}>
              <p className={styles.itemTitle}>Ishlash tezligi</p>
              <p className={styles.itemText}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores
                impedit.
              </p>
              <div className={styles.imageContainer}>
                <img
                  src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                  alt="Ishlash tezligi"
                />
              </div>
            </div>
          </div>
          <div className={styles.gridItem}>
            <div className={styles.innerContent}>
              <p className={styles.itemTitle}>Xavfsizlik</p>
              <p className={styles.itemText}>
                Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                suspendisse semper morbi.
              </p>
              <div className={styles.imageContainer}>
                <img
                  src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                  alt="Xavfsizlik"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
