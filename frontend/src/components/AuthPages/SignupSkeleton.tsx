// SignupSkeleton.tsx
import styles from './SignupPageSkeleton.module.css';

const SignupSkeleton = () => {
  return (
    <div className={styles.signupPageBox}>
      <div className="mb-3 placeholder-glow">
        <div className={`${styles.signupPageInput} placeholder`}></div>
      </div>
      <div className="mb-3 placeholder-glow">
        <div className={`${styles.signupPageInput} placeholder`}></div>
      </div>
      <div className="mb-3 placeholder-glow">
        <div className={`${styles.signupPageInput} placeholder`}></div>
      </div>
      <div className="mb-3 placeholder-glow">
        <div className={`${styles.signupPageInput} placeholder`}></div>
      </div>
      <div className="placeholder-glow mt-4">
        <div className={`${styles.signupBtn} placeholder`} style={{ height: '44px' }}></div>
      </div>
    </div>
  );
};

export default SignupSkeleton;
