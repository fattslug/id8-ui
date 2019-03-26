 /*
  Steps:
	1. Prepare artifact properties
	2. Build npm
	3. Upload artifact to Artifactory
*/

node('digital') {

    // JFrog Artifactory
	artifactory_server_id = "artifactory-qa"
	artifactory_cred_id = "3cd094da-753a-47cb-af39-f1b2c481a837"
	artifactory_target_repository = "aviva-id8-snapshot/id8-ui" 
	artifactory_server_url = "https://qa.artifactory.ana.corp.aviva.com/artifactory"

    // Artifactory
    String artifact_prefix_name = "id8-ui"
    String artifact_version = "1.0"
    String artifact_tmp_dir = "/tmp/id8-ui"
    String artifact_zip_excludes = "--exclude=\"*.git*\" --exclude=\"*Jenkinsfile\" --exclude=\"*.gitignore\""
    String artifact_name = "${artifact_prefix_name}-${artifact_version}-${env.BUILD_NUMBER}-SNAPSHOT.zip"
	String artifact_tmp_file_path = "${artifact_tmp_dir}/${artifact_name}"
	server = Artifactory.server artifactory_server_id   // Artifactory server
	server.credentialsId = artifactory_cred_id // setting artifactory credential
    
    stage('Checking out code') {
        checkout scm
        // git branch: 'develop', credentialsId: 'abd53651-e3c5-4fe9-b922-39cb15a054ad', url: 'https://sourcecode.ana.corp.aviva.com/scm/dig/claimsvendor-public-ui.git'
    }

    stage('Prepping environment') {
        def nodejstool = tool name: "nodejs-8.9.2", type: "nodejs"
        env.NODEJS_HOME = "${nodejstool}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

        echo env.PATH
        sh '''echo $PATH
        node -v
        npm -v
        npm cache clean --force
        npm install load-json-file
        npm install p-is-promise
        npm i @angular/cli@7.3.6 --registry https://qa.artifactory.ana.corp.aviva.com/artifactory/api/npm/digital-dev-npm/
        npm install node-sass --ignore-scripts --registry https://qa.artifactory.ana.corp.aviva.com/artifactory/api/npm/digital-dev-npm/
        curl -k -uaviva-catalyst-npm-readonly:AKCp5btpAkxQJiFeQMqtatXHoyBp5MUVDNTsG27vptwxT31Mkdp2dZPspck2GGHvTv4F4CtdZ -O "https://qa.artifactory.ana.corp.aviva.com/artifactory/aviva-catalyst-npm/node-v8.9.2-headers.tar.gz"
        cd node_modules/node-sass
        /usr/bin/node ../../node_modules/node-gyp/bin/node-gyp.js rebuild --verbose --libsass_ext= --libsass_cflags= --libsass_ldflags= --libsass_library= --tarball=../../node-v8.9.2-headers.tar.gz
        #Build with proxy and internet access
        cd ../../
        # Step to fix missing vendor folder in node-sass
        npm rebuild node-sass'''
    }

    try {

        stage('Installing modules') {
            sh "npm  -loglevel verbose install --registry https://qa.artifactory.ana.corp.aviva.com/artifactory/api/npm/digital-dev-npm/";
        }

        stage('Running angular build') {
            sh "npm run build:prod"
        }

        stage('Uploading to Artifactory') {
            dir(workspace) {
                sh "mkdir -p ${artifact_tmp_dir}"	// create tmp directory
                sh "rm -rf ${artifact_tmp_file_path}"	// delete duplicate file in tmp directory
                sh "which zip"
                sh "zip -r ${artifact_tmp_file_path} ${artifact_zip_excludes} ./dist"	// zip
            }

            // Create the upload spec.
            def uploadSpec = """{
                "files": [
                        {
                            "pattern": "${artifact_tmp_file_path}",
                            "target": "${artifactory_target_repository}/"
                        }
                    ]
                }"""

            // Upload to Artifactory.
            buildInfo = server.upload spec: uploadSpec

            // Publish the build to Artifactory
            server.publishBuildInfo buildInfo
        }
        
    } catch (e) {
		println e
		job_failure = true
	} finally {
        // Failing build
        job_failure = false
		if (job_failure) {
			currentBuild.result = 'FAILURE'
		}
    }
}