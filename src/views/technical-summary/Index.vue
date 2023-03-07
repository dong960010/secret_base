<template>
  <div id="technical-summary">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>备忘通知</span>
            <el-button style="float: right; padding: 3px 0" type="text">配置SMTP</el-button>
          </div>
          <div>
            <el-form :model="formParams" :rules="formRules">
              <el-form-item prop="subject">
                <md-input v-model="formParams.subject" icon="el-icon-search" name="subject" placeholder="输入邮件主题">Input Subject</md-input>
              </el-form-item>
              <el-form-item label-width="70px" label="SMTP">
                <el-select v-model="formParams.EmianService" clearable placeholder="请选择SMTP授权码" style="width:220px">
                  <el-option value="163">163</el-option>
                  <el-option value="QQ">QQ</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="70px" label="Time">
                <el-date-picker
                  v-model="formParams.date"
                  type="datetime"
                  placeholder="选择通知时间"
                />
              </el-form-item>
              <el-form-item label-width="70px" label="From">
                <el-input v-model="formParams.emailForm" placeholder="请输入发信邮箱">
                  <template slot="append">{{ suffix }}.com</template>
                </el-input>
              </el-form-item>
              <el-form-item label-width="70px" label="To">
                <el-input v-model="formParams.emailTo" placeholder="请输入收信邮箱">
                  <template slot="append">{{ suffix }}.com</template>
                </el-input>
              </el-form-item>

              <div class="confirm">
                <div class="pan-btn green-btn">Send</div>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card class="box-card">
          <el-table :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="Date">
              <template slot-scope="scope">
                <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="300px" label="Title">
              <template slot-scope="{row}">
                <span>{{ row.title }}</span>
                <el-tag>{{ row.type }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="Author">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" label="Importance">
              <template slot-scope="scope">
                <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
              </template>
            </el-table-column>

            <el-table-column align="center" label="Readings" width="95">
              <template slot-scope="scope">
                <span>{{ scope.row.pageviews }}</span>
              </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="Status" width="110">
              <template slot-scope="{row}">
                <el-tag :type="row.status | statusFilter">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'

export default {
  name: 'TechnicalSummary',
  components: { MdInput },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      formParams: {
        subject: '',
        emailForm: '',
        emailTo: '',
        EmianService: '163',
        SMTP: ''
      },
      formRules: {
        subject: [{ required: true, trigger: 'change', validator: validate }]
      }
    }
  },
  computed: {
    suffix() {
      return this.formParams.EmianService.toLocaleLowerCase() || 163
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-input-group__append {
    width: 95px;
  }
  .article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.confirm {
  display: flex;
  justify-content: flex-end;
}
</style>
