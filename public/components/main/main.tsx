import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiPanel,
  EuiText
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

import Chart from './Chart';
import { getData } from "./utils"
import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
	componentDidMount() {
		getData().then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
      /*
			<TypeChooser>
				{type => <Chart type={type} data={this.state.data} />}
      </TypeChooser>
      */
     <Chart type="hybrid" data={this.state.data} />
		)
	}
}

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/stock/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }
  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>
                <FormattedMessage
                  id="stock.helloWorldText"
                  defaultMessage="{title} Hello World!"
                  values={{ title }}
                />
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="stock.congratulationsTitle"
                    defaultMessage="Congratulations"
                  />
                </h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiPanel style={{ maxWidth: 300 }}>
                <EuiForm>
                  <EuiFormRow
                      label="Select ticker"
                      compressed
                    >
                  <EuiSelect
                    hasNoInitialSelection
                    options={[
                      { value: 'AAPL', text: 'AAPL' },
                      { value: 'UUP', text: 'UUP' },
                    ]}

                    />
                    </EuiFormRow>
                  </EuiForm>
              </EuiPanel>
              <ChartComponent />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
