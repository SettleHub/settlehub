<template>
  <div class="submission-types-toggler">
    <label class="action-title">
      1. Оберіть тип заяви на поселення поселення:
    </label>
    <div class="togglable-types">
      <div class="wrapper" @click="changeSubmissionType(SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR)">
        <p :class="['submissionType', { active: submissionType == SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR }]">Період навчання</p>
      </div>
      <span class="separator"></span>
      <div class="wrapper" @click="changeSubmissionType(SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_SUMMER)">
        <p :class="['submissionType', { active: submissionType == SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_SUMMER }]">Літній період</p>
      </div>
    </div>
  </div>
</template>

<script>
import { SUBMISSION_TYPE } from "@/types/SubmissionTypes";

export default {
  data() {
    return {
      SUBMISSION_TYPE,
    };
  },
  props: {
    submissionType: {
      type: SUBMISSION_TYPE,
      required: false,
      default: SUBMISSION_TYPE.SETTLEMENT_STUDENT_FOR_A_YEAR
    }
  },
  methods: {
    changeSubmissionType(newSubmissionType) {
      this.$emit('update:submissionType', newSubmissionType);
    }
  },
};
</script>

<style scoped lang="scss">
.submission-types-toggler {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px 40px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.action-title {
  @include poppins-bold;
  @include responsive-font(16, 11, 1440);
  color: $text-dark-blue;
  padding-left: 5px;
}

.togglable-types {
  display: flex;
  width: max-content;
  flex-direction: row;
  justify-content: space-between;
  gap: 13px;

  .wrapper {
    cursor: pointer;
    padding: 5px 3px;
  }

  .separator {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 30%;
      height: 40%;
      width: 1px;
      background-color: $black;
      transform: translateX(-50%);
    }
  }

  .submissionType {
    transition: all ease 0.2s;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-light-gray;
    @include poppins-bold;
    @include responsive-font(16, 11, 1440);

    &.active, &:hover {
      color: $text-dark-blue;
    }
  }
}

</style>
