import { createContext } from 'react';
import { CampaignState as CampaignStateType } from './campaignReducer';

export interface CampaignContextType extends CampaignStateType {
  getCampaigns: () => Promise<void>;
  getMyCampaigns: () => Promise<void>;
  getCampaignForId: (id: number) => Promise<void>;
  createCampaign: (formData: any) => Promise<string | undefined>;
  editCampaign: (campaignId: number, formData: any) => Promise<any>;
  deleteCampaign: (id: number) => Promise<void>;
  getTags: (campaignId: number) => Promise<void>;
  createTag: (campaignId: number, formData: any) => Promise<string | undefined>;
  editTag: (
    campaignId: number,
    tagId: number,
    formData: any
  ) => Promise<number | undefined>;
  deleteTag: (campaignId: number, tagId: number) => Promise<void>;
}

const CampaignContext = createContext<CampaignContextType | null>(null);

export default CampaignContext;
